import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserModel implements Omit<User, 'passwordHash'> {
  @ApiProperty({
    description: 'Id пользователя',
  })
  id: number;
  @ApiProperty({
    description: 'Имя пользователя',
  })
  name: string;
  @ApiProperty({
    description: 'Фамилия пользователя',
  })
  surname: string;
  @ApiProperty({
    description: 'Email пользователя',
  })
  email: string;
  @ApiProperty({
    description: 'Ник пользователя',
  })
  nickname: string;
  @ApiProperty({
    description: 'Описание пользователя',
    required: false,
    type: 'string',
  })
  description: string | null;
  @ApiProperty({
    description: 'Дата создания пользователя',
  })
  createTime: Date;
  @ApiProperty({
    description: 'Дата обновления пользователя',
  })
  updateTime: Date;
  @ApiProperty({
    description: 'Удален?',
    default: false,
  })
  isArchive: boolean;

  @ApiProperty({
    description: 'ID аватара',
    required: false,
    nullable: true,
    type: 'number',
  })
  avatarId: number | null;
}
