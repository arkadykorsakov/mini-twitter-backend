import { TagModel } from '../models/tag.model';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { AutocompleteDto } from 'base/domain/dtos/autocomplete.dto';
import { TagDto } from '../dtos/tag.dto';
import { TagSearchQueryDto } from '../dtos/tag-search-queryDto';

export interface ITagService {
  createTag(dto: TagDto): Promise<TagModel>;
  autoCompleteTags(
    dto: TagSearchQueryDto,
  ): Promise<SearchResultDto<AutocompleteDto>>;
}
