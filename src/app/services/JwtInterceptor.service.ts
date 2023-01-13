import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor {
    omitCalls = ['auth'];
    skipInterceptor = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.omitCalls.forEach(api => {
        if (req.url.includes('api')) {
          this.skipInterceptor = true;
        }
      });
      if (req.url.includes('vi')) {
        this.skipInterceptor = true;
      }
    //   console.log(req)
    // let token = localStorage.getItem('accessToken');
    // if (token && this.skipInterceptor) {
    //   console.log("intercepoto")

    //   const Authorization = "Bearer " + localStorage.getItem('accessToken') || "";
    //   return next.handle(req.clone({setHeaders: {Authorization}}));
    // }
    return next.handle(req);
  }
}
