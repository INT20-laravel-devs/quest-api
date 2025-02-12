import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParticipationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly include = {
    quest: {
      include: {
        tasks: true,
      },
    },
  };

  async create(data: Prisma.ParticipationUncheckedCreateInput) {
    return this.prismaService.participation.create({
      data,
      include: this.include,
    });
  }

  async findMany(where: Prisma.ParticipationWhereInput) {
    return this.prismaService.participation.findMany({
      where,
      include: this.include,
    });
  }

  async findById(userId: string, questId: string) {
    return this.prismaService.participation.findFirst({
      where: { userId, questId },
      include: this.include,
    });
  }
}
