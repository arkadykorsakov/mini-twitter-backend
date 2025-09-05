import { Prisma } from '@prisma/client';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { PostModel } from '../models/post.model';

export interface IPostRepository {
  searchWithQuery(
    where: Prisma.PostWhereInput,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<PostModel>>;
  createPost(data: Prisma.PostCreateInput): Promise<PostModel>;
  findById(id: number): Promise<PostModel | null>;
  update(id: number, data: Prisma.PostCreateInput): Promise<PostModel | null>;
  delete(id: number): Promise<null>;
}
