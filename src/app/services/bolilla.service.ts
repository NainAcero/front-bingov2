import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';
import { Bolilla } from '../models/bolilla';

@Injectable({
  providedIn: 'root'
})
export class BolillaService {

  private urlEndPoint: string = URL_BACKEND + '/api/bolillas';

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  getBolilla() {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authService.token}`
    });

    return this._http.get(this.urlEndPoint, {headers: httpHeaders}).pipe(
      map( (response: any) => {
        return response as Bolilla;
      } )
    );
  }

}
