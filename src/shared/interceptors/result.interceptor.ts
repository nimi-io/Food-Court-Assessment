// result.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    Logger.log({ url });

    if (!url.includes('api/v1/business') && !url.includes('api/v1/open')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        const message = data?.message || 'Success';
        return {
          success: true,
          message,
          code: 200,
          returnStatus: 'OK',
          data: data?.data ?? data,
          meta: data?.meta ?? undefined,
        };
      }),
    );
  }
}

@Catch()
export class GlobalErrorInterceptor extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'ExceptionFilter',
    );

    response.status(status).json({
      success: false,
      message,
      code: status,
      returnStatus: 'INTERNAL_SERVER_ERROR',
      data: null,
    });
  }
}
