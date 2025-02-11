import { Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(data: CreateCommentDto) {
    return this.commentService.createComment(data);
  }

  @Get(':questId')
  async getComments(@Param() questId: string) {
    return this.commentService.getComments(questId);
  }
}
