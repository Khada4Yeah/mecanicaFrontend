import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

import { Vehiculo, createVehiculoDTO } from '../models/vehiculo.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl: string = environment.API_URL + 'vehiculos';
  private http = inject(HttpClient);

  constructor() { }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }

  createVehiculo(vehiculo: createVehiculoDTO): Observable<any> {
    const json = JSON.stringify(vehiculo);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(json);
    return this.http.post(`${this.apiUrl}`, json, { headers });
  }
}