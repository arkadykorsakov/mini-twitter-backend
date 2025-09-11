import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../base/constants/validationMessages';
import { ExistCommentValidator } from '../validators/exist-comment.validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Много текста',
    description: 'Тело комментария',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MESSAGES.IS_STRING })
  text: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID родительского комментария',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Validate(ExistCommentValidator)
  parentCommentId: number;
}
