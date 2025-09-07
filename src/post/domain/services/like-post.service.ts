import { ILikePostService } from '../interfaces/ILikePostService';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikePostRepository } from '../../infrastructure/repositories/like-post.repository';
import { PostRepository } from '../../infrastructure/repositories/post.repository';
import { PostModel } from '../models/post.model';

@Injectable()
export class LikePostService implements ILikePostService {
  constructor(
    private readonly likePostRepository: LikePostRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async toggleLikePost(postId: number, userId: number): Promise<PostModel> {
    const post = await this.postRepository.findById(postId, userId);

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    if (post.authorId === userId) {
      throw new BadRequestException('Нельзя поставить лайк своему посту');
    }

    const existingLike = await this.likePostRepository.findLikePost(
      postId,
      userId,
    );

    if (!existingLike) {
      await this.likePostRepository.likePost(postId, userId);
    } else {
      await this.likePostRepository.unlikePost(postId, userId);
    }

    const updatedPost = await this.postRepository.findById(postId, userId);

    return updatedPost as PostModel;
  }
}
