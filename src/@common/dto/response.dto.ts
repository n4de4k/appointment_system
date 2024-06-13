import { ApiProperty } from '@nestjs/swagger';

export class Response<T> {
  @ApiProperty()
  code: string;
  @ApiProperty()
  data: T;

  static success<T>(data: T): Response<T> {
    return {
      code: 'SUCCESS',
      data,
    };
  }
}
