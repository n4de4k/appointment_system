import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServiceException } from '../exception/service.exception';
import { Response as ExpressResponse } from 'express';
import { Response } from '../dto/response.dto';

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const status = exception.getStatus();

    response.status(status).send(Response.createError(exception.errorCode));
  }
}
