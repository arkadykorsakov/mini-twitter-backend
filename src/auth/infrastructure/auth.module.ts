import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../domain/services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'base/services/prisma.service';
import { UserRepository } from 'user/infrastructure/repositories/user.repository';
import { UserService } from 'user/domain/services/user.service';
import { UserModule } from 'user/infrastructure/user.module';
import { getJwtConfig } from 'config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CookieService } from '../domain/services/cookie.service';
import { TokenService } from '../domain/services/token.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    PrismaService,
    JwtStrategy,
    CookieService,
    TokenService,
  ],
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class AuthModule {}
