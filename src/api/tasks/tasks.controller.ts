import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateImageTaskDto } from './dto/create-task.dto';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('/tasks')
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

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') taskId: string) {
    return this.tasksService.delete(taskId);
  }
}
