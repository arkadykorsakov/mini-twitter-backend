import {
  CreateCommentData,
  ICommentRepository,
} from '../../domain/interfaces/ICommentRepository';
import { PrismaService } from '../../../base/services/prisma.service';
import { Comment, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateCommentData): Promise<Comment> {
    return this.prismaService.comment.create({
      data: {
        text: data.text,
        post: { connect: { id: data.postId } },
        user: { connect: { id: data.userId } },
        ...(data.parentCommentId && {
          parentComment: { connect: { id: data.parentCommentId } },
        }),
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.comment.delete({
      where: { id },
    });
  }

  async getById(id: number): Promise<Comment | null> {
    return this.prismaService.comment.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.CommentUpdateInput): Promise<Comment> {
    return this.prismaService.comment.update({
      where: { id },
      data,
    });
  }
}
