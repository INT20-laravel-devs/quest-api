import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() data: CreateCommentDto) {
    return this.commentService.createComment(data);
  }

  @Get('/:questId')
  async getComments(@Param('questId') questId: string) {
    return this.commentService.getComments(questId);
  }

  @Delete('/:id')
  async deleteComment(@Param('id') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }
}
