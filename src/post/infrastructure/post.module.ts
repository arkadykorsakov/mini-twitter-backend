import { Module } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { PostService } from '../domain/services/post.service';
import { PostController } from './controllers/post.controller';
import { PrismaService } from 'base/services/prisma.service';
import { ExistImageValidator } from '../../base/domain/validators/exist-image';
import { FileModule } from '../../file/infrastructure/file.module';

@Module({
  imports: [FileModule],
  controllers: [PostController],
  providers: [PostRepository, PostService, PrismaService, ExistImageValidator],
})
export class PostModule {}
