import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { VALIDATION_MESSAGES } from 'base/constants/validationMessages';
import { ExistImageValidator } from 'base/domain/validators/exist-image';

export class PostDto {
  @ApiProperty({
    description: 'Заголовок поста',
    example: 'Мой первый пост',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  title: string;

  @ApiProperty({
    description: 'Содержание поста',
    example: 'Текст моего первого поста...',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  body: string;

  @ApiPropertyOptional({
    description: 'ID изображения для поста',
    example: 123,
    nullable: true,
  })
  @IsOptional()
  @IsInt({ message: VALIDATION_MESSAGES.IS_INT })
  @Validate(ExistImageValidator)
  imageId?: number;
}
