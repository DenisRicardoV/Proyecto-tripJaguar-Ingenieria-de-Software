import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap, map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthTouristGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot): boolean{
      return this.canActivate(route, state)
  }
  canLoad(route: Route):boolean{
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string):boolean{

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    if(this.auth.checkAuthorization('turista')){
      return true;
    }
    this.router.navigate(['/']);

    return false;
  }

}
