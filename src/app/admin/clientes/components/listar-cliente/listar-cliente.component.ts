import { Component, HostListener, OnInit } from '@angular/core';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.scss'
})
export class ListarClienteComponent implements OnInit {
  paginaCargada: boolean = false;
  clientes: Cliente[] = [];

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
        console.log(clientes);

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

  deleteUsuario(): void {
  }

}
