import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SearchWithQueryDto } from 'base/domain/dtos/search-with-query.dto';

export class TagSearchQueryDto extends SearchWithQueryDto {
  @ApiPropertyOptional({
    example: 'Тег',
    description: 'Поиск по названию тега',
  })
  @IsOptional()
  @IsString()
  query: string;
}
