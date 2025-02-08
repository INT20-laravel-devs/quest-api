import { Module } from '@nestjs/common';
import { QuestsController } from './questsController';
import { QuestsService } from './quests.service';

@Module({
  controllers: [QuestsController],
  providers: [QuestsService],
  exports: [QuestsService],
  imports: [],
})
export class QuestsModule {}
