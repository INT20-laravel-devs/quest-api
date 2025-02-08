import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { QuestsService } from './quests.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FastifyRequest } from 'fastify';

@Controller('quest')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(
    @Body() createQuest: CreateQuestDto,
    @Req() request: FastifyRequest,
  ) {
    return this.questsService.create(createQuest, request['user']['id']);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAll(@Req() request: FastifyRequest) {
    return this.questsService.findManyByUser(request['user']['id']);
  }
}
