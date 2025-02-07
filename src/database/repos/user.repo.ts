import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async find(where: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({ where });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id } });
  }
}
