import { Injectable } from '@angular/core';
import { tokenKey } from '@angular/core/src/view';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';



import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AngularFireAuth
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const token: string = localStorage.getItem('access_token');
    if(token){
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (req.url.match(/upload/) ) {
      delete req.headers['Content-Type'];
    } else {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    console.log(req.headers)


    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                //401 UNAUTHORIZED - SECTION 2
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED")
                }
                const err = error.error.message || error.statusText;
                return throwError(error);
           })
        );
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
