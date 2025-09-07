import { PostModel } from '../models/post.model';

export interface ILikePostService {
  toggleLikePost(postId: number, userId: number): Promise<PostModel>;
}
