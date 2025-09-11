import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../base/constants/validationMessages';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Много текста',
    description: 'Тело комментария',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  text: string;
}
