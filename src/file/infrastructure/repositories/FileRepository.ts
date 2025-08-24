import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IFileRepository } from '../../domain/interfaces/IFileRepository';
import { PrismaService } from '../../../base/services/prisma.service';
import { FileModel } from '../../domain/models/file.model';

@Injectable()
export class FileRepository implements IFileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.FileCreateInput): Promise<FileModel> {
    return this.prismaService.file.create({ data });
  }

  async findById(id: number): Promise<FileModel | null> {
    return this.prismaService.file.findUnique({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.file.delete({ where: { id } });
  }
}
