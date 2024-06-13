import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '../exception/error.code';

export class Response<T> {
  @ApiProperty()
  code: string;
  @ApiProperty()
  data: T;
  @ApiProperty()
  error: string;

  static createSuccess<T>(data: T): Response<T> {
    return {
      code: 'SUCCESS',
      data,
      error: null,
    };
  }

  static createError(errorCode: ErrorCode): Response<null> {
    return {
      code: errorCode.code,
      data: null,
      error: errorCode.message,
    };
  }
}
