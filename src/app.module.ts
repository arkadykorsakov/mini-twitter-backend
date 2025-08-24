import { Module } from '@nestjs/common';
import { UserModule } from 'user/infrastructure/user.module';
import { AuthModule } from 'auth/infrastructure/auth.module';
import { FileModule } from 'file/infrastructure/file.module';

@Module({
  imports: [UserModule, AuthModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
