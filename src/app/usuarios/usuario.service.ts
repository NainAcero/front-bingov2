import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_BACKEND } from '../config/config';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../login/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = URL_BACKEND + '/api/usuarios';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthService
  ) { }

  getUsuarios(page: number): Observable<Usuario[]> {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.get(this.urlEndPoint + '?desde=' + page, {headers: httpHeaders}).pipe(
      map( (response: any) => {
        ( response.usuarios as Usuario[]).map(usuario => {
          usuario.nombre = usuario.nombre.toUpperCase();
          return usuario;
        });
        return response;
      } )
    );
  }

  buscarUser( buscar: String ): Observable<Usuario[]> {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.get(this.urlEndPoint + '/buscar?nombre=' + buscar, {headers: httpHeaders}).pipe(
      map( (response: any) => {
        ( response.usuarios as Usuario[]).map(usuario => {
          usuario.nombre = usuario.nombre.toUpperCase();
          return usuario;
        });
        return response;
      } )
    );
  }
}
