import { Injectable } from "@angular/core";

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpParams,
} from "@angular/common/http";

import { Observable, BehaviorSubject } from "rxjs";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { LoadingSpinnerService } from "./services/loading-spinner.service";


@Injectable()
export class HrssInterceptor implements HttpInterceptor {

  constructor(
    private loaderSrv: LoadingSpinnerService
  ) {
    this.loaderSrv.initLoader();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log("enter the interceptor!!!!");
    let skipLoader = false ;
      // Clone the request and set the new header in one step.
      const customReq = req.clone({
        headers: req.headers.set('assignment-author', 'Kameshwara')
      });

      console.log('processing request', customReq);
      !skipLoader && this.loaderSrv.showLoaderOnCount();
    return next
      .handle(customReq)
      .pipe(map((event: any) => {
        if (event instanceof HttpResponse) {
          !skipLoader && this.loaderSrv.hideLoaderOnCount();
        }
        return event;
      }))
      .pipe(
        catchError((error: HttpErrorResponse) => {
            !skipLoader && this.loaderSrv.hideLoaderOnCount();
          return this.handleError(req, error, next);
        })
      );
  }

  handleError(_req: HttpRequest<any>, err: HttpErrorResponse, next: HttpHandler): any {
    if (err instanceof HttpErrorResponse) {     
        switch ((<HttpErrorResponse>err).status) {         
          default:
            return throwError(err);
        }
    }
    return throwError(err);
  }
}
