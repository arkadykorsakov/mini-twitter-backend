export interface IStorageService {
  deleteFile(fileName: string, folder: string): Promise<void>;
  getFileUrl(fileName: string, folder: string): string;
  fileExists(fileName: string, folder: string): Promise<boolean>;
}
