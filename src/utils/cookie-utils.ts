import { FastifyReply, FastifyRequest } from 'fastify';

export class CookieUtils {
  static setJwtCookie(res: FastifyReply, value: string) {
    res.setCookie('jwt', value, {
      httpOnly: true,
      path: '/',
    });
  }

  static getJwtCookie(req: FastifyRequest): string | undefined {
    return req.cookies['jwt'];
  }
}
