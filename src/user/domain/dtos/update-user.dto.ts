import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { VALIDATION_MESSAGES } from 'base/constants/validationMessages';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExistAvatarIdValidator } from '../validators/exist-avatar-id';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  surname: string;

  @ApiProperty({
    example: 'ivan_the_best',
    description: 'Никнейм пользователя',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  nickname: string;

  @ApiPropertyOptional({
    example: 'Люблю программировать и читать книги',
    description: 'Описание пользователя',
    required: false,
  })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID аватара пользователя',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Validate(ExistAvatarIdValidator)
  avatarId: number;
}
