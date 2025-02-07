import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfig {
  constructor(private configService: ConfigService) {}

  get secret(): string | undefined {
    return this.configService.get<string>('jwt.secret');
  }

  get ttl(): string | undefined {
    return this.configService.get<string>('jwt.ttl');
  }
}
