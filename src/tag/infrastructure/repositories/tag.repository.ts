import { PrismaService } from 'base/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ITagRepository } from '../../domain/interfaces/ITagRepository';
import { TagModel } from 'tag/domain/models/tag.model';
import { SearchResultDto } from 'base/domain/dtos/search-result.dto';
import { AutocompleteDto } from 'base/domain/dtos/autocomplete.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByTitle(title: string): Promise<TagModel | null> {
    return this.prismaService.tag.findFirst({
      where: {
        title,
      },
    });
  }

  async create(data: Prisma.TagCreateInput): Promise<TagModel> {
    return this.prismaService.tag.create({
      data,
    });
  }

  async autoComplete(
    where: Prisma.TagWhereInput,
    page: number,
    limit: number,
  ): Promise<SearchResultDto<AutocompleteDto>> {
    const [items, total] = await Promise.all([
      this.prismaService.tag.findMany({
        where,
        select: {
          id: true,
          title: true,
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prismaService.tag.count({ where }),
    ]);

    const autocompleteItems: AutocompleteDto[] = items.map((item) => ({
      id: item.id,
      label: item.title,
    }));

    return {
      items: autocompleteItems,
      total,
    };
  }
}
