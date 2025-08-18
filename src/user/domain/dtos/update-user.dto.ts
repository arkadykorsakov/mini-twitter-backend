import { IsOptional, IsString, Validate } from 'class-validator';
import { VALIDATION_MESSAGES } from 'base/constants/validationMessages';
import { NicknameUniqueValidator } from '../validators/nickname-unique.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  surname: string;

  @ApiProperty({
    example: 'ivan_the_best',
    description: 'Никнейм пользователя',
  })
  @Validate(NicknameUniqueValidator)
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
}
