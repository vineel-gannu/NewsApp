import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private loginService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginService.IsAuthenticated(localStorage.getItem('token')).pipe(map((data : any) => {
        if(data.isAuthenticated)
        {
          return true; 
        }
        return false;
      }), catchError((err: HttpErrorResponse) => {
        this.route.navigateByUrl('/login');
        return throwError(err);
      }));
  }
}
