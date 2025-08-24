import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../base/services/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { UserModel } from '../../domain/models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchWithQuery(
    where: Prisma.UserWhereInput,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<UserModel>> {
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        omit: {
          passwordHash: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total };
  }

  async findById(id: number, isArchive = false): Promise<UserModel | null> {
    return this.prisma.user.findFirst({
      where: { id, ...(isArchive ? {} : { isArchive: false }) },
      omit: {
        passwordHash: true,
      },
    });
  }

  async findByEmail(
    email: string,
    excludeId?: number,
  ): Promise<UserModel | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        NOT: excludeId ? { id: excludeId } : undefined,
      },
      omit: {
        passwordHash: true,
      },
    });
  }

  async findByNickname(
    nickname: string,
    excludeId?: number,
  ): Promise<UserModel | null> {
    return this.prisma.user.findFirst({
      where: {
        nickname,
        NOT: excludeId ? { id: excludeId } : undefined,
      },
      omit: {
        passwordHash: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prisma.user.create({
      data,
      omit: {
        passwordHash: true,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<UserModel | null> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        omit: {
          passwordHash: true,
        },
      });
    } catch {
      return null;
    }
  }

  findByEmailWithoutPassword(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
