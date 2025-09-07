import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from '../../domain/services/tag.service';
import { TagSearchQueryDto } from '../../domain/dtos/tag-search-queryDto';
import { TagDto } from '../../domain/dtos/tag.dto';
import { ApiOkSearchResponse } from 'base/infrastructure/decorators/ApiOkSearchResponse';
import { AutocompleteDto } from 'base/domain/dtos/autocomplete.dto';

@ApiTags('Теги')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('autocomplete')
  @ApiOperation({ summary: 'Автодополнение тегов' })
  @ApiOkSearchResponse({
    type: AutocompleteDto,
  })
  autoCompleteTags(dto: TagSearchQueryDto) {
    return this.tagService.autoCompleteTags(dto);
  }

  @Post()
  @ApiOperation({ summary: 'Создание нового тега' })
  createTag(@Body() dto: TagDto) {
    return this.tagService.createTag(dto);
  }
}
