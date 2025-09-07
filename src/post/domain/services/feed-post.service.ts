import { Injectable } from '@nestjs/common';
import { IFeedPostService } from '../interfaces/IFeedPostService';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { PostModel } from '../models/post.model';
import { FeedPostRepository } from '../../infrastructure/repositories/feed-post.repository';

@Injectable()
export class FeedPostService implements IFeedPostService {
  constructor(private readonly feedPostRepository: FeedPostRepository) {}

  getFeedPosts(
    userId: number,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<PostModel>> {
    return this.feedPostRepository.getFeedPosts(userId, page, limit);
  }
}
