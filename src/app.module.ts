import { Module } from '@nestjs/common';
import config from './config/config';
import { ConfigurationModule } from './config/configuration.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
