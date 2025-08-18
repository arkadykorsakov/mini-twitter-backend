import { ApiProperty } from '@nestjs/swagger';

export class SearchResultDto<T> {
  @ApiProperty({
    type: 'array',
  })
  items: T[];

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  total: number;
}
