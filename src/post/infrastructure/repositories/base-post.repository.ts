import { Prisma } from '@prisma/client';
import { PostModel } from 'post/domain/models/post.model';
import { PrismaService } from 'base/services/prisma.service';

export abstract class BasePostRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  protected buildInclude(userId?: number) {
    return {
      author: true,
      _count: { select: { likes: true } },
      likes: userId
        ? {
            where: { userId },
            select: { id: true },
          }
        : false,
    };
  }

  protected mapPost(post: any, userId?: number): PostModel {
    return {
      ...post,
      likeCount: post._count.likes,
      isLiked: userId ? post.likes.length > 0 : false,
    };
  }

  protected async searchWithQuery(
    where: Prisma.PostWhereInput,
    page: number,
    limit: number,
    userId: number,
  ) {
    const [items, total] = await Promise.all([
      this.prismaService.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        include: this.buildInclude(userId),
      }),
      this.prismaService.post.count({ where }),
    ]);

    return { items: items.map((p) => this.mapPost(p, userId)), total };
  }
}
