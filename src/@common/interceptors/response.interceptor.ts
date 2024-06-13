import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from '../dto/response.dto';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return next.handle().pipe(map((data) => Response.success(data)));
  }
}
