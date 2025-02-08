import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepo } from './repos/user.repo';

@Global()
@Module({
  providers: [PrismaService, UserRepo],
  exports: [UserRepo],
})
export class DatabaseModule {}
