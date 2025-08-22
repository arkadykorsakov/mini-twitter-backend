import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserSearchQueryDto } from '../dtos/user-search-query.dto';
import { hash } from 'argon2';
import { Prisma, User } from '@prisma/client';
import { IUserService } from '../interfaces/IUserService';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}
  getUsers(dto: UserSearchQueryDto): Promise<SearchResultDto<UserModel>> {
    const { query = '', limit = 10, page = 1 } = dto;
    const [firstWord, secondWord] = query.trim().split(' ');

    const where: Prisma.UserWhereInput = {
      isArchive: false,
    };

    if (query) {
      where.OR = [];
      where.OR?.push({ nickname: { contains: query, mode: 'insensitive' } });
      if (firstWord && secondWord) {
        where.OR?.push({
          AND: [
            {
              OR: [
                { name: { contains: firstWord, mode: 'insensitive' } },
                { surname: { contains: firstWord, mode: 'insensitive' } },
              ],
            },
            {
              OR: [
                { name: { contains: secondWord, mode: 'insensitive' } },
                { surname: { contains: secondWord, mode: 'insensitive' } },
              ],
            },
          ],
        });
      }
    }

    return this.userRepository.searchWithQuery(where, page, limit);
  }

  async createUser(dto: CreateUserDto): Promise<UserModel> {
    const { password, ...restDto } = dto;
    const passwordHash = await hash(password);
    return this.userRepository.create({
      ...restDto,
      passwordHash,
    });
  }

  async getUserById(id: number): Promise<UserModel> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async getUserWithPasswordByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmailWithoutPassword(email);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<UserModel> {
    const updated = await this.userRepository.update(id, dto);
    if (!updated) throw new NotFoundException('Пользователь не найден');
    return updated;
  }

  async archiveUser(id: number): Promise<UserModel> {
    const updated = await this.userRepository.update(id, { isArchive: true });
    if (!updated) throw new NotFoundException('Пользователь не найден');
    return updated;
  }

  async restoreUser(id: number): Promise<UserModel> {
    const updated = await this.userRepository.update(id, { isArchive: false });
    if (!updated) throw new NotFoundException('Пользователь не найден');
    return updated;
  }
}
