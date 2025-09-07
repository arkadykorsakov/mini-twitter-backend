import { Module } from '@nestjs/common';
import { PrismaService } from 'base/services/prisma.service';
import { TagController } from './controllers/tag.controller';
import { TagService } from '../domain/services/tag.service';
import { TagRepository } from './repositories/tag.repository';

@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository, PrismaService],
})
export class TagModule {}
