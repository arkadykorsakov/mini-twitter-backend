import { Module } from '@nestjs/common';
import { UserModule } from 'user/infrastructure/user.module';
import { AuthModule } from 'auth/infrastructure/auth.module';
import { FileModule } from 'file/infrastructure/file.module';
import { FeedModule } from 'feed/infrastructure/feed.module';
import { PostModule } from './post/infrastructure/post.module';

@Module({
  imports: [UserModule, AuthModule, FileModule, FeedModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
