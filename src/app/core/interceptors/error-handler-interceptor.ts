import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs';

interface ErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const nzService = inject(NzMessageService);
  return next(req).pipe(
    catchError((error: ErrorResponse) => {
      if (Array.isArray(error.message)) error.message.forEach((msg) => nzService.error(msg));

      if (!Array.isArray(error.message))
        nzService.error((error.message as string) || 'An unexpected error occurred');

      throw error;
    }),
  );
};
