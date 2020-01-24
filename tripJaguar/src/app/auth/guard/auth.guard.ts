import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route  } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot, 
    state:RouterStateSnapshot): Observable<boolean>{
      return this.canActivate(route, state)
  }
  canLoad(route: Route): Observable<boolean>{
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string):Observable<boolean>{
    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles ? false : true ),
      tap(isLogead => {
        if (!isLogead) {
          console.error('Usuario Logeado ')
        }
      })
    );
  }

}
