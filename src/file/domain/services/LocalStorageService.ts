import { Injectable, NotFoundException } from '@nestjs/common';
import { IStorageService } from '../interfaces/IStorageService';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LocalStorageService implements IStorageService {
  private readonly basePath = process.cwd();

  async deleteFile(fileName: string, folder: string): Promise<void> {
    try {
      const filePath = path.join(this.basePath, folder, fileName);
      await fs.unlink(filePath);
    } catch {
      throw new NotFoundException('File not found');
    }
  }

  getFileUrl(fileName: string, folder: string): string {
    return `/${folder}/${fileName}`;
  }

  async fileExists(fileName: string, folder: string): Promise<boolean> {
    try {
      const filePath = path.join(this.basePath, folder, fileName);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
