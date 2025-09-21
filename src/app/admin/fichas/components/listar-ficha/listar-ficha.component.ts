import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Ficha } from '../../../../core/models/ficha.model';
import { FichaService } from '../../../../core/services/ficha.service';
import { ModalService } from '../../../../core/services/modal.service';
import { ScreenService } from '../../../../core/services/screen.service';
import { RequestStatus } from '../../../../core/models/request-status.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cliente } from '../../../../core/models/cliente.model';
import { Vehiculo } from '../../../../core/models/vehiculo.model';
import { ClienteService } from '../../../../core/services/cliente.service';
import { VehiculoService } from '../../../../core/services/vehiculo.service';

@Component({
  selector: 'app-listar-ficha',
  templateUrl: './listar-ficha.component.html',
  styleUrl: './listar-ficha.component.scss'
})
export class ListarFichaComponent implements OnInit {
  paginaCargada: boolean = false;
  fichas: Ficha[] = [];
  status: RequestStatus = 'init';
  clientes: Cliente[] = [];
  vehiculos: Vehiculo[] = [];
  idCliente: number = 0;
  idVehiculo: number = 0;

  private modal = inject(ModalService);
  private mensaje = inject(NzMessageService);
  private clienteService = inject(ClienteService);
  private vehiculoService = inject(VehiculoService);
  private screenService = inject(ScreenService);

  isSmallScreen: boolean = false;

  constructor(private fichaService: FichaService) { }

  ngOnInit(): void {
    this.getClientes();
    this.screenService.isSmallScreen$.subscribe((isSmall) => {
      this.isSmallScreen = isSmall;
    });
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      error: (error) => {
        this.modal.mostrar('error', 'Error al cargar los clientes');
      },
      complete: () => {
        this.idVehiculo = 0;
        this.paginaCargada = true;
      }
    });
  }

  getVehiculosCliente(): void {
    this.paginaCargada = false;
    this.idVehiculo = 0; // Resetea el idVehiculo
    this.vehiculos = []; // Limpia el array de vehiculos
    this.fichas = []; // Limpia el array de fichas
    this.vehiculoService.getVehiculoCliente(this.idCliente).subscribe({
      next: (vehiculos: Vehiculo[]) => {
        this.vehiculos = vehiculos;
      },
      error: (err) => {
        this.paginaCargada = true;
        this.modal.mostrar('error', 'Error al cargar los vehículos');
      },
      complete: () => {
        this.paginaCargada = true;
      }
    })
  }

  getFichasVehiculo(): void {
    this.paginaCargada = false;
    this.fichaService.getFichasVehiculo(this.idVehiculo).subscribe({
      next: (fichas: Ficha[]) => {
        this.fichas = fichas;
      },
      error: (err) => {
        this.paginaCargada = true;
        this.modal.mostrar('error', 'Error al cargar las fichas');
      },
      complete: () => {
        this.paginaCargada = true;
      }
    });
  }

  pdfFicha(id_ficha: number): void {
    this.status = 'loading';
    this.mensaje.loading('Generando PDF...', { nzDuration: 0 });
    this.fichaService.pdfFicha(id_ficha).subscribe({
      next: (pdf) => {
        const file = new Blob([pdf], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        this.status = 'success';
        this.mensaje.remove();
        window.open(fileURL);
      },
      error: (err) => {
        this.status = 'failed';
        this.mensaje.remove();
        this.modal.mostrar('error', 'Error al generar el PDF');
      },
      complete: () => {
      }
    });
  }
}