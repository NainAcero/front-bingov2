import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(
    private _http: HttpClient
  ) {}

  public get usuario():Usuario {
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token():string {
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const UrlEndpoint = URL_BACKEND + '/api/login';

    return this._http.post<any>(UrlEndpoint, usuario);
  }

  loginAdmin(usuario: Usuario): Observable<any> {
    const UrlEndpoint = URL_BACKEND + '/api/login/admin';

    return this._http.post<any>(UrlEndpoint, usuario);
  }

  renew(token: string): Observable<any> {
    const UrlEndpoint = URL_BACKEND + '/api/login/renew';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this._http.get<any>(UrlEndpoint, {headers: httpHeaders});
  }

  register(usuario: Usuario): Observable<any> {

    usuario.nombre = usuario.nombre.toLowerCase();
    const UrlEndpoint = URL_BACKEND + '/api/login/new';

    return this._http.post<any>(UrlEndpoint, usuario);
  }

  guardarUsuario(accessToken: string):void {
    let payload = this.obtenerDatosToken(accessToken);

    this._usuario = new Usuario();
    this._usuario._id = payload.usuario._id;
    this._usuario.role = payload.usuario.role;
    this._usuario.telefono = payload.usuario.telefono;
    this._usuario.online = payload.usuario.online;
    this._usuario.nombre = payload.usuario.nombre;
    this._usuario.email = payload.usuario.email;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string):void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string):any {
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated():boolean {
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.usuario.email && payload.usuario.telefono.length > 0){
      return true;
    }
    return false;
  }

  hasRole(role:string): boolean{
    if(this.usuario.role == role){
      return true;
    }
    return false;
  }

  logout():void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
