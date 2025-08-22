export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenService {
  generateTokens(userId: number): IToken;
  verifyRefreshToken(token: string): Promise<{ id: number }>;
}
