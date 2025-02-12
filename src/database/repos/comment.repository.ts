import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private include = {
    user: {
      select: {
        nickname: true,
        avatarLink: true,
      },
    },
  };

  async create(data: Prisma.CommentUncheckedCreateInput) {
    return this.prismaService.comment.create({
      data,
      include: {
        user: {
          select: {
            nickname: true,
            avatarLink: true,
          },
        },
      },
    });
  }

  async findMany(where: Prisma.CommentFindManyArgs) {
    return this.prismaService.comment.findMany({
      ...where,
      include: this.include,
    });
  }
}
