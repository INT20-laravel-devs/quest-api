import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { FileModule } from '../../file/file.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [FileModule],
  exports: [TasksService],
})
export class TasksModule {}
