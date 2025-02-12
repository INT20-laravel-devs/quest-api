import { Injectable } from '@nestjs/common';
import { Quest } from '@prisma/client';

@Injectable()
export class QuestsMapper {
  mapQuests(quests: Quest[]) {
    return quests.map((quest: any) => this.mapQuest(quest));
  }

  mapQuest(quest: Quest) {
    return {
      id: quest.id,
      ownerId: quest.ownerId,
      title: quest.title,
      description: quest.description,
      timeLimit: quest.timeLimit,
      isPublished: quest.isPublished,
    };
  }

  getOne(quest: Quest & { grade: number }) {
    return {
      id: quest.id,
      ownerId: quest.ownerId,
      title: quest.title,
      description: quest.description,
      timeLimit: quest.timeLimit,
      grade: quest.grade,
      isApproved: quest.isApproved,
      isPublished: quest.isPublished,
    };
  }
}
