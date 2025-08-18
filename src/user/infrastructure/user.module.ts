import { Module } from '@nestjs/common';
import { UserService } from '../domain/services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from '../../base/services/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { EmailUniqueValidator } from '../domain/validators/email-unique.validator';
import { NicknameUniqueValidator } from '../domain/validators/nickname-unique.validator';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    UserRepository,
    EmailUniqueValidator,
    NicknameUniqueValidator,
  ],
})
export class UserModule {}
