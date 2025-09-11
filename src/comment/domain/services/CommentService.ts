import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICommentService } from '../interfaces/ICommentService';
import { CommentRepository } from '../../infrastructure/repositories/CommentRepository';
import { Comment } from '@prisma/client';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CreateCommentData } from '../interfaces/ICommentRepository';
import { PostRepository } from '../../../post/infrastructure/repositories/post.repository';

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createComment(data: CreateCommentData): Promise<Comment> {
    const post = await this.postRepository.findById(data.postId);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    return this.commentRepository.create(data);
  }
  async deleteComment(currentUserId: number, id: number): Promise<void> {
    const comment = await this.commentRepository.getById(id);
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    if (comment.userId !== currentUserId) {
      throw new ForbiddenException('Вы не можете удалить чужой комментарий');
    }
    await this.commentRepository.delete(id);
  }
  async updateComment(
    currentUserId: number,
    id: number,
    dto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.getById(id);
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    if (comment.userId !== currentUserId) {
      throw new ForbiddenException(
        'Вы не можете редактировать чужой комментарий',
      );
    }
    return this.commentRepository.update(id, dto);
  }
}
