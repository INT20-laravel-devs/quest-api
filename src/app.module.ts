import { Module } from '@nestjs/common';
import config from './config/config';
import { ConfigurationModule } from './config/configuration.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
  ],
})
export class AppModule {}
