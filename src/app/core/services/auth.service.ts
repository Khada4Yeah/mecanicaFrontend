import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = '';
  private http = inject(HttpClient);

  constructor(private tokenService: TokenService) {
    this.apiUrl = environment.API_URL + 'administradores';
  }


  login(correo: string, clave: string): Observable<any> {
    const json = JSON.stringify({ correo_electronico: correo, clave });
    const params = new HttpParams().set('content-type', 'application/json');

    return this.http.post<Token>(`${this.apiUrl}/login`, json, { params }).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
      }));
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);
    this.tokenService.removeToken();
    return this.http.post(`${this.apiUrl}/logout`, null, { headers });
  }


}
