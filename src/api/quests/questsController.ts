import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { QuestsService } from './quests.service';

@Controller('quest')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  async create(@Body() createQuest: CreateQuestDto) {
    const userId = '56e6a2ae-6678-4ff7-8554-87a2270ec962';
    return this.questsService.create(createQuest, userId);
  }
}
