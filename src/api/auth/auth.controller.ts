import {
  Body,
  Controller,
  Post,
  Param,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { CookieUtils } from '../../utils/cookie-utils';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/email-approve/:token')
  async approveEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const jwt = await this.authService.approveEmail(token);
    CookieUtils.setJwtCookie(res, jwt);
  }

  @Post('/sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const jwt = await this.authService.signIn(signInDto);
    CookieUtils.setJwtCookie(res, jwt);
  }

  @Post('/email-resend')
  async sendEmail(@Body('email') email: string) {
    return this.authService.resendEmail(email);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getCurrentUser(@Req() req: FastifyRequest) {
    return req['user'];
  }
}
