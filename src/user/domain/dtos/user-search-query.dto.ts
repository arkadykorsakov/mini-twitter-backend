import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SearchWithQueryDto } from 'base/domain/dtos/search-with-query.dto';

export class UserSearchQueryDto extends SearchWithQueryDto {
  @ApiPropertyOptional({
    example: 'Иван Иванов  / ivanov',
    description: 'Поиск по имени и фамилии или никнейму',
  })
  @IsOptional()
  @IsString()
  query: string;
}
