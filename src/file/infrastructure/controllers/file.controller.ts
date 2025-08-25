import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileUpload } from '../decorators/file-upload.decorator';
import { FileService } from '../../domain/services/FileService';
import { FileModel } from '../../domain/models/file.model';
import { ImageMimeTypes } from '../../domain/enums/FileMimeTypeEnum';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

@ApiTags('Файлы')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Загрузка файла' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    type: FileModel,
  })
  @FileUpload({
    maxFileSize: MAX_FILE_SIZE,
    fieldName: 'file',
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileModel> {
    return this.fileService.uploadFile(file);
  }

  @Post('upload-image')
  @ApiOperation({ summary: 'Загрузка файла' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    type: FileModel,
  })
  @FileUpload({
    maxFileSize: MAX_FILE_SIZE,
    fieldName: 'file',
    allowedMimeTypes: ImageMimeTypes,
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileModel> {
    return this.fileService.uploadFile(file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение файла по id' })
  @ApiParam({ type: 'number', name: 'id' })
  @ApiResponse({
    type: FileModel,
  })
  async getFileById(@Param('id', ParseIntPipe) id: number): Promise<FileModel> {
    return this.fileService.getFileById(id);
  }
}
