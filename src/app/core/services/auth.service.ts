import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
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
    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post<Token>(`${this.apiUrl}/login`, json, { headers }).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
      }),
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);
    return this.http.post(`${this.apiUrl}/logout`, null, { headers }).pipe(
      tap(() => {
        this.tokenService.removeToken();
      },
      ));
  }



}
