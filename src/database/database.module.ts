import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TasksRepository } from './repos/tasks.repository';
import { QuestsRepository } from './repos/quests-repository';
import { UserRepo } from './repos/user.repo';
import { ParticipationRepository } from './repos/participation.repository';
import { CommentRepository } from './repos/comment.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    TasksRepository,
    QuestsRepository,
    UserRepo,
    ParticipationRepository,
    CommentRepository,
  ],
  exports: [
    TasksRepository,
    QuestsRepository,
    UserRepo,
    ParticipationRepository,
    CommentRepository,
  ],
})
export class DatabaseModule {}
