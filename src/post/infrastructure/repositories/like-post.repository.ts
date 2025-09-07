import { PrismaService } from 'base/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ILikePostRepository } from '../../domain/interfaces/ILikePostRepository';
import { Like } from '@prisma/client';

@Injectable()
export class LikePostRepository implements ILikePostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findLikePost(postId: number, userId: number, ): Promise<Like | null> {
    return this.prismaService.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
  }

  async unlikePost(postId: number, userId: number): Promise<void> {
    await this.prismaService.like.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });
  }

  async likePost(postId: number, userId: number): Promise<void> {
    await this.prismaService.like.create({
      data: {
        postId,
        userId,
      },
    });
  }
}
