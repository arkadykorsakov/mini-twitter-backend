import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserSearchQueryDto } from '../dtos/user-search-query.dto';
import { UserModel } from '../models/user.model';

export interface IUserService {
  getUsers(dto: UserSearchQueryDto): Promise<SearchResultDto<UserModel>>;
  createUser(dto: CreateUserDto): Promise<UserModel>;
  getUserById(id: number): Promise<UserModel>;
  updateUser(id: number, dto: UpdateUserDto): Promise<UserModel>;
  archiveUser(id: number): Promise<UserModel>;
  restoreUser(id: number): Promise<UserModel>;
}
