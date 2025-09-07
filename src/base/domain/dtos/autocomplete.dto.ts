import { ApiProperty } from '@nestjs/swagger';

export class AutocompleteDto {
  @ApiProperty({
    description: 'Id элемента',
  })
  id: number;

  @ApiProperty({
    description: 'Отображаемое название элемента',
    example: 'Название элемента',
  })
  label: string;
}
