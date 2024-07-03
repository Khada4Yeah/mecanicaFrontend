import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Reparacion } from '../models/reparacion.model';
import { HttpClient } from '@angular/common/http';
import { checkToken } from '../../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ReparacionService {
  private apiUrl: string = environment.API_URL + 'reparaciones';
  private http = inject(HttpClient);

  constructor() { }

  getReparaciones(): Observable<Reparacion[]> {
    return this.http.get<Reparacion[]>(this.apiUrl, { context: checkToken() });
  }
}
