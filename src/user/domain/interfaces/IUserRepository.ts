import { Prisma, User } from '@prisma/client';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { UserModel } from '../models/user.model';

export interface IUserRepository {
  searchWithQuery(
    where: Prisma.UserWhereInput,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<UserModel>>;
  create(data: Prisma.UserCreateInput): Promise<UserModel>;
  findById(id: number, isArchive?: boolean): Promise<UserModel | null>;
  findByEmail(email: string, excludeId?: number): Promise<UserModel | null>;
  findByNickname(
    nickname: string,
    excludeId?: number,
  ): Promise<UserModel | null>;
  update(id: number, data: Prisma.UserUpdateInput): Promise<UserModel | null>;
  findByEmailWithoutPassword(email: string): Promise<User | null>;
}
