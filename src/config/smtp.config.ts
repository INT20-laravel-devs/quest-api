import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmtpConfig {
  constructor(private configService: ConfigService) {}

  get host(): string | undefined {
    return this.configService.get<string>('smtp.host');
  }

  get username(): string | undefined {
    return this.configService.get<string>('smtp.username');
  }

  get password(): string | undefined {
    return this.configService.get<string>('smtp.password');
  }
}
