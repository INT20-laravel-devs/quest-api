import { TasksRepository } from '../../database/repos/tasks.repository';
import { CreateImageTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(dto: CreateImageTaskDto) {
    const { coordinate, ...rest } = dto;
    if (coordinate) {
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
