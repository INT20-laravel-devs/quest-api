import { Module } from '@nestjs/common';
import config from './config/config';
import { ConfigurationModule } from './config/configuration.module';
import { QuestsModule } from './api/quests/quests.module';
import { TasksModule } from './api/tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    QuestsModule,
    TasksModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
