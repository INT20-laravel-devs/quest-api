import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentsModule {}
