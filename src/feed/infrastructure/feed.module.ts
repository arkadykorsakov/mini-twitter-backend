import { Module } from '@nestjs/common';
import { FeedRepository } from './repositories/feed.repository';
import { FeedService } from '../domain/services/feed.service';
import { FeedController } from './controllers/feed.controller';
import { PrismaService } from 'base/services/prisma.service';
import { UserModule } from 'user/infrastructure/user.module';

@Module({
  imports: [UserModule],
  controllers: [FeedController],
  providers: [FeedRepository, FeedService, PrismaService],
})
export class FeedModule {}
