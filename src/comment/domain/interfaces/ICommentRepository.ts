import { Comment, Prisma } from '@prisma/client';

export interface CreateCommentData {
  text: string;
  userId: number;
  postId: number;
  parentCommentId?: number;
}

export interface ICommentRepository {
  getById(id: number): Promise<Comment | null>;
  create(data: CreateCommentData): Promise<Comment>;
  update(id: number, data: Prisma.CommentUpdateInput): Promise<Comment>;
  delete(id: number): Promise<void>;
}
