import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly include = {
    coordinate: true,
    variants: true,
  };

  async create(data: Prisma.TaskUncheckedCreateInput) {
    return this.prismaService.task.create({ data, include: this.include });
  }
}
