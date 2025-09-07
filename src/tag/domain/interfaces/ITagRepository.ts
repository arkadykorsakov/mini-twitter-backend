import { TagModel } from '../models/tag.model';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { AutocompleteDto } from 'base/domain/dtos/autocomplete.dto';
import { Prisma } from '@prisma/client';

export interface ITagRepository {
  findByTitle(title: string): Promise<TagModel | null>;
  create(data: Prisma.TagCreateInput): Promise<TagModel>;
  autoComplete(
    where: Prisma.TagWhereInput,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<AutocompleteDto>>;
}
