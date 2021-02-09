import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this._authService.isAuthenticated()){
        this._router.navigate(['/login']);
        return false;
      }

      let role = route.data['role'] as string;
      if(this._authService.usuario.role == role) {
        return true;
      }
      Swal.fire('Acceso denegado', `Hola ${this._authService.usuario.nombre} no tienes acceso a este recurso!`, 'warning');
      this._router.navigate(['/home']);
      return false;
  }
}
