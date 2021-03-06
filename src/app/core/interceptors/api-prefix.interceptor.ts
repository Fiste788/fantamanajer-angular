import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = req.url.startsWith('../') ? req.url : environment.apiEndpoint + req.url;
    const ct = 'Content-Type';
    let headers = req.headers;

    if (!headers.has('Accept')) {
      headers = headers.set('Accept', 'application/json');
    }

    if (!req.headers.has(ct) && req.method !== 'DELETE') {
      headers = headers.set(ct, 'application/json');
    } else if (headers.get(ct) === 'multipart/form-data') {
      headers = headers.delete(ct);
    }

    return next
      .handle(
        req.clone({
          headers,
          url,
        }),
      )
      .pipe(
        map((event: HttpEvent<{ data: Record<string, unknown>; success: boolean }>) => {
          if (event instanceof HttpResponse && event.body !== null) {
            if (!req.params.has('page') || !Object.keys(event.body).includes('pagination')) {
              return event.clone({
                body: event.body.data,
              });
            }
          }

          return event;
        }),
      );
  }
}
