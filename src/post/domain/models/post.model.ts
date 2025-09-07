import { Post } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserModel } from '../../../user/domain/models/user.model';

export class PostModel implements Post {
  @ApiProperty({
    description: 'Уникальный идентификатор поста',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Заголовок поста',
    example: 'Мой первый пост',
  })
  title: string;

  @ApiProperty({
    description: 'Содержание поста',
    example: 'Это текст моего первого поста...',
  })
  body: string;

  @ApiPropertyOptional({
    description: 'ID изображения поста',
    example: 123,
    nullable: true,
  })
  imageId: number | null;

  @ApiProperty({
    description: 'ID автора поста',
    example: 1,
  })
  authorId: number;

  @ApiProperty({
    description: 'Дата создания поста',
    example: '2024-01-15T10:30:00.000Z',
  })
  createTime: Date;

  @ApiProperty({
    description: 'Дата последнего обновления поста',
    example: '2024-01-15T11:45:00.000Z',
  })
  updateTime: Date;

  @ApiPropertyOptional({
    description: 'Автор поста',
    type: () => UserModel,
  })
  author?: UserModel;

  @ApiPropertyOptional({
    description: 'Количество лайков поста',
  })
  likeCount: number;

  @ApiPropertyOptional({
    description: 'Пользователь уже лайкнул пост',
  })
  isLiked: boolean;
}
