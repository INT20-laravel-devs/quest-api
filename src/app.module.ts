import { Module } from '@nestjs/common';
import config from './config/config';
import { ConfigurationModule } from './config/configuration.module';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class AppModule {}
