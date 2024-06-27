import { Component, HostListener, OnInit, inject } from '@angular/core';

import { Cliente } from '../../../../core/models/cliente.model';

import { ClienteService } from '../../../../core/services/cliente.service';
import { EncryptionService } from '../../../../core/services/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.scss'
})
export class ListarClienteComponent implements OnInit {
  paginaCargada: boolean = false;
  clientes: Cliente[] = [];
  private encryptionService = inject(EncryptionService);
  private router = inject(Router);

  isSmallScreen: boolean = false;

  constructor(private clienteService: ClienteService) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {

        this.clientes = clientes;
        this.paginaCargada = true;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {

      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // Cambia 768 al tamaño que desees
  }

  editCliente(id_cliente: string): void {
    const encryptedId = this.encryptionService.encrypt(id_cliente);
    this.router.navigate([`/admin/clientes/editar/${encryptedId}`]);
  }

}
