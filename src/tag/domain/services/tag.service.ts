import { Injectable } from '@nestjs/common';
import { ITagService } from '../interfaces/ITagService';
import { TagRepository } from '../../infrastructure/repositories/tag.repository';
import { TagDto } from '../dtos/tag.dto';
import { TagModel } from '../models/tag.model';
import { SearchResultDto } from '../../../base/domain/dtos/search-result.dto';
import { AutocompleteDto } from '../../../base/domain/dtos/autocomplete.dto';
import { TagSearchQueryDto } from '../dtos/tag-search-queryDto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService implements ITagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createTag(dto: TagDto): Promise<TagModel> {
    const existingTag = await this.tagRepository.findByTitle(dto.title);
    if (existingTag) {
      return existingTag;
    }
    return this.tagRepository.create(dto);
  }

  autoCompleteTags(
    dto: TagSearchQueryDto,
  ): Promise<SearchResultDto<AutocompleteDto>> {
    const where: Prisma.TagWhereInput = dto.query
      ? {
          title: {
            contains: dto.query,
            mode: 'insensitive',
          },
        }
      : {};
    return this.tagRepository.autoComplete(where, dto.page, dto.limit);
  }
}
