import {
  Body,
  Controller,
  Post, UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateImageTaskDto } from './dto/create-task.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Body() createTask: CreateImageTaskDto,
    @UploadedFile() file: File,
  ) {
    console.log(file);
    return this.tasksService.create(createTask);
  }
}
