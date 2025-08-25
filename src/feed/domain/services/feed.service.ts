import { IFeedService } from '../interfaces/IFeedService';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FeedModel } from '../models/feed.model';
import { FeedRepository } from '../../infrastructure/repositories/feed.repository';
import { UserService } from '../../../user/domain/services/user.service';

@Injectable()
export class FeedService implements IFeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly userService: UserService,
  ) {}

  async follow(followerId: number, followedId: number): Promise<FeedModel> {
    if (followedId === followerId) {
      throw new ConflictException('Нельзя подписаться на самого себя');
    }

    await this.userService.getUserById(followedId);

    const existFeed = await this.feedRepository.findByFollowerIdAndFollowedId(
      followerId,
      followedId,
    );

    if (existFeed) {
      throw new ConflictException('Подписка уже существует');
    }

    return this.feedRepository.follow(followerId, followedId);
  }
  async unfollow(followerId: number, followedId: number): Promise<void> {
    if (followedId === followerId) {
      throw new ConflictException('Нельзя отписаться от самого себя');
    }

    await this.userService.getUserById(followedId);

    const existFeed = await this.feedRepository.findByFollowerIdAndFollowedId(
      followerId,
      followedId,
    );

    if (!existFeed) {
      throw new NotFoundException('Подписка не существует');
    }

    await this.feedRepository.unfollow(followerId, followedId);
  }
}
