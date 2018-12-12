
import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';



@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req).pipe(
        catchError((err: any, caught) => {
          if (err instanceof HttpErrorResponse) {
            let message = '';
            try {
              message = err.error.data.message;
            } catch (e) {
              message = err.message;
            }
            console.error(message);
            this.snackbar.open(message, 'CLOSE', {
              duration: 5000
            });
            return observableThrowError(err);
          }
        }));
    // return next.handle(req);
  }
}