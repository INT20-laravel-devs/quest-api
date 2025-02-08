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
}
