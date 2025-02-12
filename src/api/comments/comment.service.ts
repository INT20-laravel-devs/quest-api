import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../../database/repos/comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(data: CreateCommentDto) {
    return this.commentRepository.create(data);
  }

  async getComments(questId: string) {
    return this.commentRepository.findMany({
      where: {
        questId,
      },
    });
  }

  async deleteComment(commentId: string) {
    return this.commentRepository.deleteById(commentId);
  }
}
