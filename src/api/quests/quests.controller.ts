import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { QuestsService } from './quests.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FastifyRequest } from 'fastify';
import { QuestsMapper } from './quests.mapper';

@Controller('quest')
export class QuestsController {
  constructor(
    private readonly questsService: QuestsService,
    private readonly questsMapper: QuestsMapper,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(
    @Body() createQuest: CreateQuestDto,
    @Req() request: FastifyRequest,
  ) {
    const quest = await this.questsService.create(
      createQuest,
      request['user']['id'],
    );
    return this.questsMapper.mapQuest(quest);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAll(@Req() request: FastifyRequest) {
    const quests = await this.questsService.findManyByUser(
      request['user']['id'],
    );
    return this.questsMapper.mapQuests(quests);
  }

  @Patch()
  async updateQuest(
    @Body() updateTask: { isPublished: boolean; questId: string },
  ) {
    return this.questsService.updateQuest(updateTask);
  }

  @Get('/:id/tasks')
  async getTasks(@Param('id') id: string) {
    const quest = await this.questsService.get(id);
    return quest.tasks;
  }
}
