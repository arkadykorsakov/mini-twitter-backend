import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'user/domain/dtos/create-user.dto';
import { LoginDto } from '../../domain/dtos/login.dto';
import { AuthService } from '../../domain/services/auth.service';
import { Request, Response } from 'express';
import { CookieService } from '../../domain/services/cookie.service';
import { AuthLoginModel } from '../../domain/models/auth-login.model';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUserDecorator } from '../../../user/infrastructure/decorators/current-user.decorator';
import { UserModel } from '../../../user/domain/models/user.model';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Регистрация',
  })
  @ApiOkResponse({
    type: AuthLoginModel,
  })
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ): Promise<AuthLoginModel> {
    const { refreshToken, ...response } = await this.authService.register(dto);

    this.cookieService.setRefreshToken(res, refreshToken);

    return response;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Вход',
  })
  @ApiOkResponse({
    type: AuthLoginModel,
  })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    const { refreshToken, ...response } = await this.authService.login(dto);

    this.cookieService.setRefreshToken(res, refreshToken);

    return response;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOperation({
    summary: 'Обновление токена',
  })
  @ApiOkResponse({
    type: AuthLoginModel,
  })
  @ApiCookieAuth('refreshToken')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = (req.cookies as Record<string, string> | undefined)?.[
      'refreshToken'
    ];
    if (!refreshToken) {
      this.cookieService.clearRefreshToken(res);
      throw new UnauthorizedException('Refresh токен не найден');
    }

    const tokens = await this.authService.refreshToken(refreshToken);

    const { refreshToken: newToken, ...response } = tokens;
    this.cookieService.setRefreshToken(res, newToken);

    return response;
  }
}
