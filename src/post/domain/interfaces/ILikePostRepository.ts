import { Like } from '@prisma/client';

export interface ILikePostRepository {
  likePost(postId: number, userId: number): Promise<void>;
  unlikePost(postId: number, userId: number): Promise<void>;
  findLikePost(postId: number, userId: number): Promise<Like | null>;
}
