import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TasksRepository } from './repos/tasks.repository';
import { QuestsRepository } from './repos/quests-repository';
import { UserRepo } from './repos/user.repo';

@Global()
@Module({
  providers: [PrismaService, TasksRepository, QuestsRepository, UserRepo],
  exports: [TasksRepository, QuestsRepository, UserRepo],
})
export class DatabaseModule {}
