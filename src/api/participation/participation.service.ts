import { Injectable } from '@nestjs/common';
import { ParticipationRepository } from '../../database/repos/participation.repository';
import { CreateParticipationDto } from './dto/create-participation.dto';

@Injectable()
export class ParticipationService {
  constructor(
    private readonly participationRepository: ParticipationRepository,
  ) {}

  async create(data: CreateParticipationDto) {
    return this.participationRepository.create(data);
  }

  async getAll(userId: string) {
    return this.participationRepository.findMany({
      userId,
    });
  }

  async getById(userId: string, questId: string) {
    return this.participationRepository.findById(userId, questId);
  }
}
