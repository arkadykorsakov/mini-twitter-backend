import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { PostModel } from 'post/domain/models/post.model';
import { IPostRepository } from '../../domain/interfaces/IPostRepository';
import { BasePostRepository } from './base-post.repository';
import { PrismaService } from '../../../base/services/prisma.service';

@Injectable()
export class PostRepository
  extends BasePostRepository
  implements IPostRepository
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async searchWithQuery(
    where: Prisma.PostWhereInput,
    page: number,
    limit: number,
    userId: number,
  ): Promise<SearchResultDto<PostModel>> {
    return super.searchWithQuery(where, page, limit, userId);
  }

  async createPost(data: Prisma.PostCreateInput): Promise<PostModel> {
    const post = await this.prismaService.post.create({
      data,
      include: this.buildInclude(),
    });

    return this.mapPost(post);
  }

  async findById(id: number, userId?: number): Promise<PostModel | null> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: this.buildInclude(userId),
    });

    return post ? this.mapPost(post, userId) : null;
  }

  async update(
    id: number,
    data: Prisma.PostUpdateInput,
  ): Promise<PostModel | null> {
    const post = await this.prismaService.post.update({
      where: { id },
      data,
      include: this.buildInclude(),
    });

    return this.mapPost(post);
  }

  async delete(id: number): Promise<null> {
    await this.prismaService.post.delete({
      where: { id },
    });
    return null;
  }
}
