import { Comment } from '@prisma/client';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CreateCommentData } from './ICommentRepository';

export interface ICommentService {
  createComment(data: CreateCommentData): Promise<Comment>;
  deleteComment(currentUserId: number, id: number): Promise<void>;
  updateComment(
    currentUserId: number,
    id: number,
    dto: UpdateCommentDto,
  ): Promise<Comment>;
}
