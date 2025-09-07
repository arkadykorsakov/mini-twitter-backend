import { PostModel } from '../models/post.model';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';

export interface IFeedPostService {
  getFeedPosts(
    userId: number,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<PostModel>>;
}
