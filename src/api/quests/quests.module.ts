import { Module } from '@nestjs/common';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';
import { QuestsMapper } from './quests.mapper';

@Module({
  controllers: [QuestsController],
  providers: [QuestsService, QuestsMapper],
  exports: [QuestsService],
})
export class QuestsModule {}
