import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SearchWithQueryDto } from 'base/domain/dtos/search-with-query.dto';

export class PostSearchQueryDto extends SearchWithQueryDto {
  @ApiPropertyOptional({
    example: 'Пост / Содержание поста',
    description: 'Поиск по заголовку или содержанию поста',
  })
  @IsOptional()
  @IsString()
  query: string;
}
