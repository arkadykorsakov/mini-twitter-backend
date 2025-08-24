import {  Prisma } from '@prisma/client';
import { FileModel } from '../models/file.model';

export interface IFileRepository {
  create(data: Prisma.FileCreateInput): Promise<FileModel>;
  findById(id: number): Promise<FileModel | null>;
  delete(id: number): Promise<void>;
}
