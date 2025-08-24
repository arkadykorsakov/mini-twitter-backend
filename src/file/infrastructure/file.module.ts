import { Module } from '@nestjs/common';
import { FileController } from './controllers/file.controller';
import { FileService } from '../domain/services/FileService';
import { FileRepository } from './repositories/FileRepository';
import { PrismaService } from '../../base/services/prisma.service';
import { LocalStorageService } from '../domain/services/LocalStorageService';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepository, PrismaService, LocalStorageService],
  exports: [FileService, FileRepository],
})
export class FileModule {}
