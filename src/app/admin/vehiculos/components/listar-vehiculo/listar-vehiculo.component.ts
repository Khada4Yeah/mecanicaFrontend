import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Vehiculo } from '../../../../core/models/vehiculo.model';
import { VehiculoService } from '../../../../core/services/vehiculo.service';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente.service';
import { EncryptionService } from '../../../../core/services/encryption.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.component.html',
  styleUrl: './listar-vehiculo.component.scss'
})
export class ListarVehiculoComponent implements OnInit {
  paginaCargada: boolean = false;
  vehiculos: Vehiculo[] = [];
  clientes: Cliente[] = [];
  idCliente: number = 0;

  isSmallScreen: boolean = false;

  private encryptionService = inject(EncryptionService);
  private modal = inject(ModalService);
  private router = inject(Router);

  constructor(private vehiculoService: VehiculoService, private clienteService: ClienteService) {
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
      error: (err) => {
        this.modal.mostrar('error', 'Error al cargar los clientes')
      },
      complete: () => {
        this.paginaCargada = true;
      }
    });
  }

  getVehiculosCliente(): void {
    this.paginaCargada = false;
    this.vehiculoService.getVehiculoCliente(this.idCliente).subscribe({
      next: (vehiculos: Vehiculo[]) => {
        this.vehiculos = vehiculos;
        this.paginaCargada = true;
      },
      error: (err) => {
        this.modal.mostrar('error', 'Error al cargar los vehículos del cliente');
      },
      complete: () => {
        this.paginaCargada = true;
      }
    })
  }

  editVehiculo(idVehiculo: number): void {
    const encryptedId = this.encryptionService.encrypt(idVehiculo.toString());
    this.router.navigate([`/admin/vehiculos/editar/${encryptedId}`]);
  }

  @HostListener('window:resize', ['$event'])
  onresize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; // Cambia 768 al tamaño que desees
  }

}
