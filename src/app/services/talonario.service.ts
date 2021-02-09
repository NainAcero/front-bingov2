import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../config/config';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';
import { NewTalonario, Talonario } from '../models/talonario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalonarioService {

  private urlEndPoint: string = URL_BACKEND + '/api/talonario';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthService
  ) { }

  getTalonarioByAdmin(idUser){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.get(this.urlEndPoint + '/admin?idUser=' + idUser, {headers: httpHeaders}).pipe(
      map( (response: any) => {
        return response as Talonario;
      } )
    );
  }

  getTalonarioById(id){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.get(this.urlEndPoint + '/get?idUser=' + id, {headers: httpHeaders}).pipe(
      map( (response: any) => {
        return response as Talonario;
      } )
    );
  }

  getTalonario() {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.get(this.urlEndPoint, {headers: httpHeaders}).pipe(
      map( (response: any) => {
        return response as Talonario;
      } )
    );
  }

  resetTalonario(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.post<any>(this.urlEndPoint + "/reset", [],{headers: httpHeaders});
  }

  guardarTalonario(talonario: NewTalonario): Observable<any> {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.post<any>(this.urlEndPoint + "/new", talonario, {headers: httpHeaders});
  }

  newNumber(data: any): Observable<any> {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.post<any>(this.urlEndPoint + "/newNumber", data, {headers: httpHeaders});
  }

}
