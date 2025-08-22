import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ICookieService } from '../interfaces/ICookieService';

@Injectable()
export class CookieService implements ICookieService {
  private readonly REFRESH_TOKEN_NAME = 'refreshToken';
  private readonly EXPIRE_DAY_REFRESH_TOKEN = 1;

  constructor(private readonly configService: ConfigService) {}

  setRefreshToken(res: Response, token: string): void {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, token, {
      httpOnly: true,
      domain: this.configService.get<string>('SERVER_DOMAIN', ''),
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  clearRefreshToken(res: Response): void {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get<string>('SERVER_DOMAIN', ''),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
