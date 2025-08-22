import { CreateUserDto } from 'user/domain/dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserModel } from 'user/domain/models/user.model';
import { IToken } from './ITokenService';

export interface IAuthResult extends IToken {
  user: UserModel;
}

export interface IAuthService {
  register(dto: CreateUserDto): Promise<IAuthResult>;

  login(dto: LoginDto): Promise<IAuthResult>;

  refreshToken(refreshToken: string): Promise<IAuthResult>;
}
