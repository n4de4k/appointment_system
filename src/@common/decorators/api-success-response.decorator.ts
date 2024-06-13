import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Response } from '../dto/response.dto';

export const ApiSuccessResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  description: string,
) =>
  applyDecorators(
    ApiExtraModels(Response, dataDto),
    ApiOkResponse({
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(Response) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  );
