import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from '../../infrastructure/repositories/FileRepository';
import { File, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { IFileService } from '../interfaces/IFileService';
import { LocalStorageService } from './LocalStorageService';
import { FileModel } from '../models/file.model';

@Injectable()
export class FileService implements IFileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly storageService: LocalStorageService,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<FileModel> {
    const preparedFile = this.prepareFile(file);
    return this.fileRepository.create(preparedFile);
  }

  async getFileById(id: number): Promise<FileModel> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async removeFile(id: number): Promise<void> {
    const file = (await this.getFileById(id)) as File;
    await this.fileRepository.delete(id);
    await this.storageService.deleteFile(file.fileName, 'uploads');
  }

  private prepareFile(
    file: Express.Multer.File,
    title: string = 'Загруженный файл',
  ): Prisma.FileCreateInput {
    return {
      uid: uuidv4(),
      title,
      storageName: 'local',
      fileName: file.filename,
      fileSize: file.size,
      fileMimeType: file.mimetype,
      folder: 'uploads',
      createTime: new Date(),
    };
  }
}
