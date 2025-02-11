import { Module } from '@nestjs/common';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';

@Module({
  controllers: [QuestsController],
  providers: [QuestsService],
  exports: [QuestsService],
  imports: [],
})
export class QuestsModule {}
