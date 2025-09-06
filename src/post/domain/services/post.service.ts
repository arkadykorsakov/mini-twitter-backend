import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { PostSearchQueryDto } from '../dtos/post-search-query.dto';
import { PostDto } from '../dtos/post.dto';
import { IPostService } from '../interfaces/IPostService';
import { PostModel } from '../models/post.model';
import { PostRepository } from '../../infrastructure/repositories/post.repository';
import { Prisma } from '@prisma/client';
import { UserModel } from '../../../user/domain/models/user.model';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class PostService implements IPostService {
  constructor(private readonly postRepository: PostRepository) {}

  getPosts(dto: PostSearchQueryDto): Promise<SearchResultDto<PostModel>> {
    const { query = '', limit = 10, page = 1 } = dto;
    const where: Prisma.PostWhereInput = {};

    if (query) {
      where.OR = [];
      where.OR.push({
        title: {
          contains: query,
          mode: 'insensitive',
        },
      });
      where.OR.push({
        body: {
          contains: query,
          mode: 'insensitive',
        },
      });
    }

    return this.postRepository.searchWithQuery(where, page, limit);
  }

  createPost(currentUser: UserModel, dto: PostDto): Promise<PostModel> {
    return this.postRepository.createPost({
      ...dto,
      author: {
        connect: {
          id: currentUser.id,
        },
      },
    });
  }

  async getPostById(id: number): Promise<PostModel> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException('Пост не найден');
    return post;
  }

  async updatePost(
    currentUser: UserModel,
    id: number,
    dto: PostDto,
  ): Promise<PostModel> {
    const existingPost = await this.getPostById(id);

    if (currentUser.id !== existingPost.authorId) {
      throw new ForbiddenException(
        'Недостаточно прав для редактирования поста',
      );
    }

    const updatedPost = await this.postRepository.update(id, dto);
    return updatedPost as PostModel;
  }

  async deletePost(currentUser: UserModel, id: number): Promise<void> {
    const post = await this.getPostById(id);
    if (currentUser.id !== post.authorId) {
      throw new ForbiddenException('Недостаточно прав для удаления поста');
    }
    await this.postRepository.delete(id);
  }
}
