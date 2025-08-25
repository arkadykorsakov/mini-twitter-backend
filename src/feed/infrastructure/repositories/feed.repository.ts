import { IFeedRepository } from '../../domain/interfaces/IFeedRepository';
import { FeedModel } from '../../domain/models/feed.model';
import { PrismaService } from '../../../base/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedRepository implements IFeedRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByFollowerIdAndFollowedId(
    followerId: number,
    followedId: number,
  ): Promise<FeedModel | null> {
    return this.prismaService.feed.findUnique({
      where: {
        followedId_followerId: {
          followerId,
          followedId,
        },
      },
    });
  }

  async follow(followerId: number, followedId: number): Promise<FeedModel> {
    return this.prismaService.feed.create({
      data: {
        followedId,
        followerId,
      },
    });
  }

  async unfollow(followerId: number, followedId: number): Promise<void> {
    await this.prismaService.feed.delete({
      where: {
        followedId_followerId: {
          followedId,
          followerId,
        },
      },
    });
  }
}
