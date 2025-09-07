import { Prisma } from '@prisma/client';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { PostModel } from 'post/domain/models/post.model';
import { IPostRepository } from '../../domain/interfaces/IPostRepository';
import { PrismaService } from 'base/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async searchWithQuery(
    where: Prisma.PostWhereInput,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<PostModel>> {
    const [items, total] = await Promise.all([
      this.prismaService.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        include: {
          author: true,
        },
      }),
      this.prismaService.post.count({ where }),
    ]);

    return { items, total };
  }

  async createPost(data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.prismaService.post.create({
      data,
      include: {
        author: true,
      },
    });
  }

  async findById(id: number): Promise<PostModel | null> {
    return this.prismaService.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.PostUpdateInput,
  ): Promise<PostModel | null> {
    return this.prismaService.post.update({
      where: { id },
      data,
      include: {
        author: true,
      },
    });
  }

  async delete(id: number): Promise<null> {
    await this.prismaService.post.delete({
      where: { id },
    });
    return null;
  }
}
