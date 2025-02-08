import { Injectable } from '@nestjs/common';
import { QuestsRepository } from '../../database/repos/quests-repository';
import { CreateQuestDto } from './dto/create-quest.dto';

@Injectable()
export class QuestsService {
  constructor(private readonly questsRepository: QuestsRepository) {}

  create(dto: CreateQuestDto, userId: string) {
    return this.questsRepository.create({
      ownerId: userId,
      ...dto,
    });
  }
}
