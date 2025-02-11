import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly include = {
    coordinate: true,
    variants: true,
    quest: true,
  };

  async create(data: Prisma.TaskUncheckedCreateInput) {
    return this.prismaService.task.create({ data, include: this.include });
  }

  async deleteById(id: string) {
    return this.prismaService.task.delete({ where: { id } });
  }

  async findById(id: string) {
    return this.prismaService.task.findFirst({
      where: { id },
      include: this.include,
    });
  }
}
