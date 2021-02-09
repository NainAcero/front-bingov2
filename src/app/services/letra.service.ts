import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../config/config';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LetraService {

  private urlEndPoint: string = URL_BACKEND + '/api/letras';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthService
  ) { }

  getLetra(){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.get<any>(this.urlEndPoint + '/', {headers: httpHeaders});
  }

  updateLetra(data: any){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.post(this.urlEndPoint + '/insert', data , {headers: httpHeaders});
  }
}
