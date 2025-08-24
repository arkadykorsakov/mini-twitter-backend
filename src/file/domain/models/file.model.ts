import { File } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FileModel implements File {
  @ApiProperty({
    description: 'Id файла',
  })
  id: number;
  @ApiProperty({
    description: 'UID файла',
  })
  uid: string;
  @ApiProperty({
    description: 'Заголовок файла',
  })
  title: string;
  storageName: string;
  @ApiProperty({
    description: 'Название файла',
  })
  fileName: string;
  @ApiProperty({
    description: 'Размер файла',
  })
  fileSize: number;
  @ApiProperty({
    description: 'Тип файла',
  })
  fileMimeType: string;
  @ApiProperty({
    description: 'Папка',
  })
  folder: string;
  @ApiProperty({
    description: 'Дата создания',
  })
  createTime: Date;
}
