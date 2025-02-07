import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { CookieUtils } from '../../../utils/cookie-utils';
import { UserRepo } from '../../../database/repos/user.repo';
import { Role } from '@prisma/client';
import { UnauthorizedException } from '../../../utils/exception/unauthorized.exception';
import { ForbiddenException } from '../../../utils/exception/forbidden.exception';

export function AuthGuard(role?: Role): Type<CanActivate> {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly userRepo: UserRepo,
    ) {}

    private readonly rolePriority = [Role.ADMIN, Role.PLAYER];

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const token = CookieUtils.getJwtCookie(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      let payload: { sub: string };

      try {
        payload = await this.jwtService.verifyAsync(token);
      } catch {
        throw new UnauthorizedException();
      }

      const user = await this.userRepo.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      if (
        role &&
        this.rolePriority.indexOf(user.role) > this.rolePriority.indexOf(role)
      ) {
        throw new ForbiddenException();
      }

      delete user.password;
      request['user'] = user;

      return true;
    }
  }
  return mixin(AuthGuardMixin);
}
