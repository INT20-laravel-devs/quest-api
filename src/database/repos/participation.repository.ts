import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParticipationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ParticipationUncheckedCreateInput) {
    return this.prismaService.participation.create({ data });
  }

  async findMany(where: Prisma.ParticipationWhereInput) {
    return this.prismaService.participation.findMany({ where });
  }
}
