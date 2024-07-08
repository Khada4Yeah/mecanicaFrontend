import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ficha, createFichaDTO } from '../models/ficha.model';
import { checkToken } from '../../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private apiUrl: string = environment.API_URL + 'fichas';
  private http = inject(HttpClient);

  constructor() { }

  getFichas(): Observable<Ficha[]> {
    return this.http.get<Ficha[]>(this.apiUrl, { context: checkToken() });
  }

  getFichasVehiculo(idVehiculo: number): Observable<Ficha[]> {
    return this.http.get<Ficha[]>(`${this.apiUrl}/cliente/vehiculo/${idVehiculo}`, { context: checkToken() });
  }

  pdfFicha(id_ficha: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pdf/${id_ficha}`, { responseType: 'blob', context: checkToken() });
  }

  createFicha(ficha: createFichaDTO): Observable<any> {
    const json = JSON.stringify(ficha);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Ficha>(`${this.apiUrl}`, json, { headers, context: checkToken() });
  }

}
