import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.QuestUncheckedCreateInput) {
    return this.prismaService.quest.create({
      data,
    });
  }

  async findMany(where: Prisma.QuestFindManyArgs) {
    return this.prismaService.quest.findMany({
      ...where,
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
    });
  }
}
