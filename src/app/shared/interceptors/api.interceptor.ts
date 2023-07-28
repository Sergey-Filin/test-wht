import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "@environments/environments";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiEndpoint = environment.baseUrl;
    const apiVersion = environment.apiVersion;
    const url = request.url;
    if (url.includes('api/')) {
      const resultUrl = `${apiEndpoint}/${apiVersion}/${url.replace('api/', '')}&api_key=${environment.key}`;
      request = request.clone({
        url: resultUrl,
      });
    }
    return next.handle(request);
  }
}
