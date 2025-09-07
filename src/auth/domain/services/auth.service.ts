import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'user/domain/services/user.service';
import { TokenService } from './token.service';
import { CreateUserDto } from 'user/domain/dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { verify } from 'argon2';
import { ValidationException } from 'base/domain/exceptions/ValidationException';
import { IAuthResult, IAuthService } from '../interfaces/IAuthService';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: CreateUserDto): Promise<IAuthResult> {
    const user = await this.userService.createUser(dto);
    const tokens = this.tokenService.generateTokens(user.id);
    return { user, ...tokens };
  }

  async login(dto: LoginDto): Promise<IAuthResult> {
    const userWithPassword = await this.userService.getUserWithPasswordByEmail(
      dto.email,
    );

    if (!userWithPassword) {
      throw new ValidationException({ email: ['Неверный логин или пароль'] });
    }

    const { passwordHash, ...user } = userWithPassword;

    const isPasswordValid = await verify(passwordHash, dto.password);
    if (!isPasswordValid) {
      throw new ValidationException({ email: ['Неверный логин или пароль'] });
    }

    const tokens = this.tokenService.generateTokens(user.id);
    return { user, ...tokens };
  }

  async refreshToken(refreshToken: string): Promise<IAuthResult> {
    const result = await this.tokenService.verifyRefreshToken(refreshToken);
    if (!result) throw new UnauthorizedException('Невалидный refresh токен');

    const user = await this.userService.getUserById(result.id);
    const tokens = this.tokenService.generateTokens(user.id);

    return { user, ...tokens };
  }
}
