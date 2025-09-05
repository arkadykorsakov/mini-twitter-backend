import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { PostModel } from '../models/post.model';
import { PostSearchQueryDto } from '../dtos/post-search-query.dto';
import { PostDto } from '../dtos/post.dto';
import { UserModel } from '../../../user/domain/models/user.model';

export interface IPostService {
  getPosts(dto: PostSearchQueryDto): Promise<SearchResultDto<PostModel>>;
  createPost(currentUser: UserModel, dto: PostDto): Promise<PostModel>;
  getPostById(id: number): Promise<PostModel>;
  updatePost(
    currentUser: UserModel,
    id: number,
    dto: PostDto,
  ): Promise<PostModel>;
  deletePost(currentUser: UserModel, id: number): Promise<void>;
}
