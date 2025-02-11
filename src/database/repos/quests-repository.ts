import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private include = {
    tasks: {
      include: {
        variants: true,
        coordinate: true,
      },
    },
  };

  async create(data: Prisma.QuestUncheckedCreateInput) {
    return this.prismaService.quest.create({
      data,
      include: this.include,
    });
  }

  async findMany(where: Prisma.QuestFindManyArgs) {
    return this.prismaService.quest.findMany({
      ...where,
      include: this.include,
    });
  }

  async updateQuestById(
    questId: string,
    data: Prisma.QuestUncheckedUpdateInput,
  ) {
    return this.prismaService.quest.update({
      where: {
        id: questId,
      },
      data,
      include: this.include,
    });
  }

  async findById(id: string) {
    return this.prismaService.quest.findFirst({
      where: { id },
      include: this.include,
    });
  }
}
