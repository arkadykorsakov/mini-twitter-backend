import { extname, join } from 'path';
import {
  applyDecorators,
  UnsupportedMediaTypeException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const MAX_BITS_SIZE = 25165824;

interface IFileUploadOptions {
  maxFileSize?: number;
  fieldName?: string;
  allowedMimeTypes?: string[];
}

export function FileUpload(options?: IFileUploadOptions) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(options?.fieldName ?? 'file', {
        storage: diskStorage({
          destination: join(process.cwd(), 'uploads'),
          filename: (request, file, callback) => {
            const randomName = Array(24)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return callback(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        limits: {
          fileSize: options?.maxFileSize || MAX_BITS_SIZE,
        },
        fileFilter: (req, file, callback) => {
          const allowedMimeTypes = options?.allowedMimeTypes || [];

          if (
            allowedMimeTypes.length &&
            !allowedMimeTypes.includes(file.mimetype)
          ) {
            return callback(
              new UnsupportedMediaTypeException(
                `Недопустимый тип файла: ${file.mimetype}`,
              ),
              false,
            );
          }
          callback(null, true);
        },
      }),
    ),
  );
}
