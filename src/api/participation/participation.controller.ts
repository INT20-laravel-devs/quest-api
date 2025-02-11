import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FastifyRequest } from 'fastify';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  async create(@Body() dto: CreateParticipationDto) {
    return this.participationService.create(dto);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAll(@Req() request: FastifyRequest) {
    return this.participationService.getAll(request['user']['id']);
  }
}
