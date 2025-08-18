import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchWithQueryDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'Количество результатов на странице',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;

  @ApiPropertyOptional({ example: 1, description: 'Номер страницы' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number = 1;
}
