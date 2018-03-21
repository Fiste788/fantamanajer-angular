import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = {
      url: environment.apiEndpoint + req.url
    };
    return next
      .handle(req.clone(data))
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({
            body: event.body.data
          });
          return event;
        }
      })
      );
  }
}