import { Prisma } from '@prisma/client';
import { PostModel } from 'post/domain/models/post.model';
import { PrismaService } from 'base/services/prisma.service';

type PostWithExtras = Prisma.PostGetPayload<{
  include: ReturnType<BasePostRepository['buildInclude']>;
}>;

export abstract class BasePostRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  private buildRepliesInclude(depth = 3): Prisma.CommentInclude | undefined {
    if (depth <= 0) return undefined; // вместо false
    return {
      replies: {
        include: this.buildRepliesInclude(depth - 1),
      },
    };
  }

  protected buildInclude(userId?: number) {
    return {
      author: true,
      _count: { select: { likes: true } },
      comments: {
        where: { parentCommentId: null },
        include: this.buildRepliesInclude(10),
      },
      tags: true,
      ...(userId
        ? {
            likes: {
              where: { userId },
              select: { id: true },
            },
          }
        : {}),
    };
  }

  protected mapPost(post: PostWithExtras, userId?: number): PostModel {
    const likeCount = post?._count?.likes ?? 0;
    const isLiked =
      userId && Array.isArray(post.likes) ? post.likes.length > 0 : false;
    return {
      ...post,
      likeCount,
      isLiked,
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
