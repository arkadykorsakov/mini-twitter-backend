import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SearchResultDto } from '../../domain/dtos/search-result.dto';

interface ApiOkSearchResponseOptions {
  type: new (...args: any[]) => any;
}

export function ApiOkSearchResponse(options: ApiOkSearchResponseOptions) {
  const itemType = options.type;
  return applyDecorators(
    ApiExtraModels(SearchResultDto, itemType),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SearchResultDto) },
          {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(itemType) },
              },
              total: {
                type: 'number',
                default: 1,
              },
            },
          },
        ],
      },
    }),
  );
}
