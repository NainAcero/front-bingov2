import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._authService.isAuthenticated()){
      if(this.isTokenExpirado()){
        this._authService.logout();
        this._router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

  isTokenExpirado(): boolean {
    let token = this._authService.token;
    let payload = this._authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if(payload.exp < now ){
      return true;
    }
    return false;
  }
}
