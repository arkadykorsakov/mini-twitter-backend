import { forwardRef, Module } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { PostService } from '../domain/services/post.service';
import { PostController } from './controllers/post.controller';
import { PrismaService } from 'base/services/prisma.service';
import { ExistImageValidator } from '../../base/domain/validators/exist-image';
import { FileModule } from '../../file/infrastructure/file.module';
import { LikePostService } from '../domain/services/like-post.service';
import { UserModule } from '../../user/infrastructure/user.module';
import { LikePostRepository } from './repositories/like-post.repository';
import { FeedPostService } from '../domain/services/feed-post.service';
import { FeedPostRepository } from './repositories/feed-post.repository';
import { CommentModule } from '../../comment/infrastructure/comment.module';

@Module({
  imports: [forwardRef(() => CommentModule), FileModule, UserModule],
  controllers: [PostController],
  providers: [
    PostRepository,
    PostService,
    PrismaService,
    ExistImageValidator,
    LikePostService,
    LikePostRepository,
    FeedPostService,
    FeedPostRepository,
  ],
  exports: [PostService, PostRepository],
})
export class PostModule {}
