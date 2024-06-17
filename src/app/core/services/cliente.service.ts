import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Cliente } from '../models/cliente.model';


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



}
