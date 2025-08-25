import { FeedModel } from '../models/feed.model';

export interface IFeedService {
  follow(followerId: number, followedId: number): Promise<FeedModel>;
  unfollow(followerId: number, followedId: number): Promise<void>;
}
