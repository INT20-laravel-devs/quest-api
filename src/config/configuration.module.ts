import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmtpConfig } from './smtp.config';
import { JwtConfig } from './jwt.config';

@Module({
  providers: [SmtpConfig, JwtConfig],
  exports: [SmtpConfig, JwtConfig],
})
export class ConfigurationModule extends ConfigModule {}
