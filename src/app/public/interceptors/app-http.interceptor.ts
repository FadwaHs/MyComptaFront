import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../http/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

   if(!request.url.includes("/api/Auth"))
   {
      let newreq  = request.clone({
      headers : request.headers.set('Authorization', 'Bearer '+this.authService.accessToken)
    })

    return next.handle(newreq).pipe(
      catchError((err) => {
        if (err.status == 401) {

          // 401 Unauthorized, try to refresh the access token
          return this.authService.refreshAccessToken().pipe(
            switchMap(() => {
              // Retry the original request with the new access token
              let newreqWithAccessToken = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
              });
              return next.handle(newreqWithAccessToken);
            }),
            catchError((error) => {
              // Refresh token failed or refresh token is expired, log out the user
              this.authService.logout();
              return throwError(error.message);
            })
          );
        } else {
          // Other errors, return the original error
          return throwError(err);
        }
      })
    );

   }
   else
   {
       return next.handle(request);
   }

  }
}
