import { forwardRef, Module } from '@nestjs/common';
import { CommentRepository } from './repositories/CommentRepository';
import { CommentService } from '../domain/services/CommentService';
import { ExistCommentValidator } from '../domain/validators/exist-comment.validator';
import { PrismaService } from '../../base/services/prisma.service';
import { PostModule } from '../../post/infrastructure/post.module';
import { CommentController } from './controllers/comment.controller';

@Module({
  imports: [forwardRef(() => PostModule)],
  controllers: [CommentController],
  providers: [
    CommentRepository,
    CommentService,
    ExistCommentValidator,
    PrismaService,
  ],
  exports: [CommentService],
})
export class CommentModule {}
