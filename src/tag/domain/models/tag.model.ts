import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';

export class TagModel implements Tag {
  @ApiProperty({
    description: 'Id тега',
  })
  id: number;

  @ApiProperty({
    description: 'Название тега',
    example: 'JavaScript',
    maxLength: 255,
    required: true,
  })
  title: string;
}
