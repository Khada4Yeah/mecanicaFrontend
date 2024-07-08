import { Component, HostListener, OnInit, inject } from '@angular/core';

import { Cliente } from '../../../../core/models/cliente.model';

import { ClienteService } from '../../../../core/services/cliente.service';
import { EncryptionService } from '../../../../core/services/encryption.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.scss',
})
export class ListarClienteComponent implements OnInit {
  paginaCargada: boolean = false;
  clientes: Cliente[] = [];
  activarBuscador: boolean = false;
  valorBusqueda: string = '';
  clientesFiltrados: Cliente[] = [];

  private encryptionService = inject(EncryptionService);
  private router = inject(Router);
  private modal = inject(ModalService);

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
      },
      error: (error) => this.modal.mostrar('error', 'Error al cargar los clientes')
      ,
      complete: () => {
        this.clientesFiltrados = [...this.clientes];
        this.paginaCargada = true;
      },
    });
  }

  editCliente(id_cliente: string): void {
    const encryptedId = this.encryptionService.encrypt(id_cliente);
    this.router.navigate([`/admin/clientes/editar/${encryptedId}`]);
  }

  limpiarBusqueda(): void {
    this.valorBusqueda = '';
    this.buscar();
  }

  buscar(): void {
    this.activarBuscador = true;
    const palabrasBusqueda = this.valorBusqueda.toUpperCase().split(' ');

    this.clientesFiltrados = this.clientes.filter((cliente: Cliente) => {
      const apellidoP = cliente.usuario.apellido_p.toUpperCase();
      const apellidoM = cliente.usuario.apellido_m.toUpperCase();

      return palabrasBusqueda.every(
        (palabra) => apellidoP.includes(palabra) || apellidoM.includes(palabra)
      );
    });
  }

  @HostListener('window:resize', ['$event'])
  onresize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // Cambia 768 al tamaño que desees
  }
}
