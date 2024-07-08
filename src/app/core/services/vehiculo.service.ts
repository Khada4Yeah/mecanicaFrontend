import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

import { Vehiculo, createVehiculoDTO, updateVehiculoDTO } from '../models/vehiculo.model';
import { Observable } from 'rxjs';
import { checkToken } from '../../interceptors/token.interceptor';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl: string = environment.API_URL + 'vehiculos';
  private http = inject(HttpClient);

  constructor() { }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl, { context: checkToken() });
  }

  getVehiculoCliente(id_cliente: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/cliente/${id_cliente}`, { context: checkToken() });
  }

  getVehiculo(idVehiculo: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiUrl}/${idVehiculo}`, { context: checkToken() });
  }

  createVehiculo(vehiculo: createVehiculoDTO): Observable<any> {
    const json = JSON.stringify(vehiculo);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}`, json, { headers, context: checkToken() });
  }

  updateVehiculo(vehiculo: updateVehiculoDTO, idVehiculo: number): Observable<any> {
    const json = JSON.stringify(vehiculo);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.apiUrl}/${idVehiculo}`, json, { headers, context: checkToken() });
  }
}