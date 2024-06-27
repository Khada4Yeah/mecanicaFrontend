import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Cliente, CreateClienteDTO } from '../models/cliente.model';


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

  getCliente(id_cliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id_cliente}`);
  }

  createCliente(cliente: CreateClienteDTO): Observable<any> {
    const json = JSON.stringify(cliente);
    const params = new HttpParams().set('content-type', 'application/json');
    console.log(json);

    return this.http.post<Cliente>(this.apiUrl, json, { params });
  }

  updateCliente(cliente: CreateClienteDTO, id_usuario: number): Observable<any> {
    const json = JSON.stringify(cliente);
    console.log(json);


    return this.http.patch(`${this.apiUrl}/${id_usuario}`, json).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {

          return throwError(() => error);
        }
        return throwError(() => error);
      }
      ));
  }
}
