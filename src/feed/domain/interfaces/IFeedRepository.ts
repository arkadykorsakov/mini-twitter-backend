import { FeedModel } from '../models/feed.model';

export interface IFeedRepository {
  follow(followerId: number, followedId: number): Promise<FeedModel>;
  unfollow(followerId: number, followedId: number): Promise<void>;
  findByFollowerIdAndFollowedId(
    followerId: number,
    followedId: number,
  ): Promise<FeedModel | null>;
}
