import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VALIDATION_MESSAGES } from 'base/constants/validationMessages';
import { EmailUniqueValidator } from '../validators/email-unique.validator';
import { NicknameUniqueValidator } from '../validators/nickname-unique.validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  @IsEmail({}, { message: VALIDATION_MESSAGES.IS_EMAIL })
  @Validate(EmailUniqueValidator)
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  password: string;

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
  @Validate(NicknameUniqueValidator)
  nickname: string;

  @ApiPropertyOptional({
    example: 'Люблю программировать и читать книги',
    description: 'Описание пользователя',
    required: false,
  })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  @IsOptional()
  description?: string;
}
