import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FastifyRequest } from 'fastify';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Participation')
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

  @UseGuards(AuthGuard())
  @Get('/:id')
  async getById(@Req() request: FastifyRequest, @Param('id') id: string) {
    return this.participationService.getById(request['user']['id'], id);
  }
}
