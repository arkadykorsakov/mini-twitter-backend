import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IToken, ITokenService } from '../interfaces/ITokenService';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens(userId: number): IToken {
    const payload = { id: userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(token: string): Promise<{ id: number }> {
    return this.jwtService.verifyAsync(token);
  }
}
