import { TasksRepository } from '../../database/repos/tasks.repository';
import { CreateImageTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { FileService } from '../../file/file.service';
import { File } from '@nest-lab/fastify-multer';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateImageTaskDto, file: File) {
    const imageLink = this.fileService.uploadFile(file);
    const { coordinate, ...rest } = dto;
    if (coordinate) {
      coordinate.imageLink = imageLink;
      return this.tasksRepository.create({
        ...rest,
        coordinate: {
          create: {
            ...coordinate,
          },
        },
      });
    } else {
      return this.tasksRepository.create({
        ...rest,
      });
    }
  }
}
