import { Injectable } from '@nestjs/common';
import { IFeedPostRepository } from '../../domain/interfaces/IFeedPostRepository';
import { PostModel } from '../../domain/models/post.model';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { BasePostRepository } from './base-post.repository';
import { PrismaService } from '../../../base/services/prisma.service';

@Injectable()
export class FeedPostRepository
  extends BasePostRepository
  implements IFeedPostRepository
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async getFeedPosts(
    userId: number,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<PostModel>> {
    const userSubscriptions = await this.prismaService.feed.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followedId: true,
      },
    });

    const followingIds = userSubscriptions.map((sub) => sub.followedId);

    if (followingIds.length === 0) {
      return { items: [], total: 0 };
    }

    const where = {
      authorId: { in: followingIds },
    };

    return this.searchWithQuery(where, page, limit, userId);
  }
}
