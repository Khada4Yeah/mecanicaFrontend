import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Cliente, createClienteDTO } from '../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL + 'clientes';
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  createCliente(cliente: createClienteDTO): Observable<any> {
    const json = JSON.stringify(cliente);
    const params = new HttpParams().set('content-type', 'application/json');
    console.log(json);

    return this.http.post<Cliente>(this.apiUrl, json, { params });
  }
}
