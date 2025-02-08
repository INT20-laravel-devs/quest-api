import {
  Body,
  Controller,
  Post, UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateImageTaskDto } from './dto/create-task.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTask: { createTask: CreateImageTaskDto },
    @UploadedFile() file: File,
  ) {
    return this.tasksService.create(JSON.parse(createTask.createTask as any), file);
  }
}
