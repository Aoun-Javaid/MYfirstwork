import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { tap, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public spinner: NgxSpinnerService, private router: Router, private toastr: ToastrManager) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
   
    return next.handle(request).pipe(
      tap(res => {

        if (res instanceof HttpResponse) {
        
        }
      }),
      catchError(err => {
        //this.spinner.hide();
        if (err.status === 401) {
          localStorage.removeItem('accessToken');
          window.location.reload();
        }
        const error = err.error || err.statusText;

        return throwError(error);
      }))
  }

}
