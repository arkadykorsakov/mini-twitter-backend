import { Module } from '@nestjs/common';
import { UserService } from '../domain/services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from '../../base/services/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { EmailUniqueValidator } from '../domain/validators/email-unique.validator';
import { NicknameUniqueValidator } from '../domain/validators/nickname-unique.validator';
import { FileModule } from '../../file/infrastructure/file.module';
import { ExistImageValidator } from '../../base/domain/validators/exist-image';

@Module({
  imports: [FileModule],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    UserRepository,
    EmailUniqueValidator,
    NicknameUniqueValidator,
    ExistImageValidator,
  ],
  exports: [UserService],
})
export class UserModule {}
