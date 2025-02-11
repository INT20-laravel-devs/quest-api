import { TasksRepository } from '../../database/repos/tasks.repository';
import { CreateImageTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { FileService } from '../../file/file.service';
import { File } from '@nest-lab/fastify-multer';
import { EntityNotFoundException } from '../../utils/exception/entity-not-found.exception';
import { TaskIsPublishedException } from '../../utils/exception/task-is-published.exception';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateImageTaskDto, file: File) {
    const { coordinate, variant, ...rest } = dto;
    if (coordinate) {
      return this.tasksRepository.create({
        ...rest,
        coordinate: {
          create: {
            ...coordinate,
            imageLink: coordinate.imageLink
              ? this.fileService.uploadFile(file)
              : undefined,
          },
        },
      });
    } else {
      return this.tasksRepository.create({
        ...rest,
        variants: {
          createMany: {
            data: variant,
          },
        },
      });
    }
  }

  async delete(taskId: string) {
    const task = await this.tasksRepository.findById(taskId);
    if (!task) {
      throw new EntityNotFoundException('Task', 'id');
    }
    if (task.quest.isPublished) {
      throw new TaskIsPublishedException();
    }
    await this.tasksRepository.deleteById(taskId);
  }
}
