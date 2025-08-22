import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VALIDATION_MESSAGES } from 'base/constants/validationMessages';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  @IsEmail({}, { message: VALIDATION_MESSAGES.IS_EMAIL })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Пароль пользователя',
  })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  password: string;
}
