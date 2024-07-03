import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Cliente, CreateClienteDTO, UpdateClienteDTO } from '../models/cliente.model';
import { checkToken } from '../../interceptors/token.interceptor';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl: string = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL + 'clientes';
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl, { context: checkToken() });
  }

  getCliente(id_cliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id_cliente}`, { context: checkToken() });
  }

  createCliente(cliente: CreateClienteDTO): Observable<any> {
    const json = JSON.stringify(cliente);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Cliente>(this.apiUrl, json, { headers, context: checkToken() });
  }

  updateCliente(cliente: UpdateClienteDTO, id_usuario: number): Observable<any> {
    const json = JSON.stringify(cliente);
    return this.http.patch(`${this.apiUrl}/${id_usuario}`, json, { context: checkToken() });
  }
}
