import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { LoginService } from '../services/login-service/login-service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot,
              routerSnapshot: RouterStateSnapshot):  boolean | UrlTree {

    return this.checkLogin(routerSnapshot);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, routerSnapshot: RouterStateSnapshot): boolean | UrlTree {
    return this.checkLogin(routerSnapshot);
  }

  checkLogin(routerSnapshot: RouterStateSnapshot) {
    console.log('checking login')
    if (!this.loginService.isLoggedIn()) {
      const url = encodeURI(routerSnapshot.url);
      return this.router.createUrlTree(['/login'], {queryParams: {redirect: url}});
      //this.router.navigate(['/login'], {queryParams: {redirect: redirect}});
    }
    return true;
  }

}
