import { Injectable } from '@nestjs/common';
import { QuestsRepository } from '../../database/repos/quests-repository';
import { CreateQuestDto } from './dto/create-quest.dto';
import { CommentRepository } from '../../database/repos/comment.repository';

@Injectable()
export class QuestsService {
  constructor(
    private readonly questsRepository: QuestsRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async create(dto: CreateQuestDto, userId: string) {
    return this.questsRepository.create({
      ownerId: userId,
      ...dto,
    });
  }

  async findManyByUser(userId: string) {
    return this.questsRepository.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async updateQuest(updateQuest: {
    isPublished: boolean;
    questId: string;
    isApproved: boolean;
  }) {
    return this.questsRepository.updateQuestById(updateQuest.questId, {
      isPublished: updateQuest.isPublished,
      isApproved: updateQuest.isApproved,
    });
  }

  async get(questId: string) {
    return this.questsRepository.findById(questId);
  }

  async delete(questId: string) {
    return this.questsRepository.deleteById(questId);
  }

  async getWithGrade(questId: string) {
    const quest = await this.questsRepository.findById(questId);
    const comments = await this.commentRepository.findMany({
      where: { questId },
    });
    return {
      ...quest,
      grade: comments.length
        ? comments.reduce((acc, c) => acc + c.grade, 0) / comments.length
        : 0,
    };
  }
}
