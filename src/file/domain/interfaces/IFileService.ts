import { FileModel } from '../models/file.model';

export interface IImageUploadOptions {
  width: number;
  height: number;
  title?: string;
}

export interface IFileService {
  uploadFile(file: Express.Multer.File): Promise<FileModel>;
  getFileById(id: number): Promise<FileModel | null>;
  removeFile(id: number): Promise<void>;
}
