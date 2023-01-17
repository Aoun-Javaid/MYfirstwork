import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
        let loggedUserToken= localStorage.getItem('accessToken')
        if(loggedUserToken && !request.url.includes('/api/exchange/')){
            if (loggedUserToken) {
                request = request.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${loggedUserToken}`
                    }
                });
            }
        }
 
        return next.handle(request);
    }
}