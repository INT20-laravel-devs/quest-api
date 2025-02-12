import { Module } from '@nestjs/common';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';
import { QuestsMapper } from './quests.mapper';
import { QuestGateway } from './quest.gateway';

@Module({
  controllers: [QuestsController],
  providers: [QuestsService, QuestsMapper, QuestGateway],
  exports: [QuestsService],
})
export class QuestsModule {}
