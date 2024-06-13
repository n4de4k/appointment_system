import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error.code';

export class ServiceException extends HttpException {
  constructor(public readonly errorCode: ErrorCode) {
    super(
      errorCode.message,
      ServiceException.ASSOCIATED_ERROR_CODE_TO_STATUS_CODE.get(
        errorCode.code,
      ) ?? HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static ASSOCIATED_ERROR_CODE_TO_STATUS_CODE = new Map<string, HttpStatus>([]);
}
