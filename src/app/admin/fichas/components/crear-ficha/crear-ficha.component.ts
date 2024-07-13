import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { Cliente } from '../../../../core/models/cliente.model';
import { Vehiculo } from '../../../../core/models/vehiculo.model';
import { Reparacion } from '../../../../core/models/reparacion.model';
import { RequestStatus } from '../../../../core/models/request-status.model';
import { TransferItem } from 'ng-zorro-antd/transfer';

import { VehiculoService } from '../../../../core/services/vehiculo.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ReparacionService } from '../../../../core/services/reparacion.service';
import { FichaService } from '../../../../core/services/ficha.service';
import { ModalService } from '../../../../core/services/modal.service';

import { of, switchMap, tap, catchError } from 'rxjs';

@Component({
  selector: 'app-crear-ficha',
  templateUrl: './crear-ficha.component.html',
  styleUrls: ['./crear-ficha.component.scss']
})
export class CrearFichaComponent implements OnInit {
  paginaCargada = false;
  formularioFicha!: FormGroup;

  clientes: Cliente[] = [];
  vehiculos: Vehiculo[] = [];
  listaReparaciones: Reparacion[] = [];
  listaReparacionesTransfer: TransferItem[] = [];
  status: RequestStatus = 'init';

  private clienteService = inject(ClienteService);
  private vehiculoService = inject(VehiculoService);
  private reparacionService = inject(ReparacionService);
  private fichaService = inject(FichaService);
  private modal = inject(ModalService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.buildForm();
  }

  ngOnInit() {
    this.loadInitialData();
    this.setupFormListeners();
  }

  private buildForm(): void {
    this.formularioFicha = this.formBuilder.group({
      ficha: this.formBuilder.group({
        id_cliente: [null, Validators.required],
        id_vehiculo: [null, Validators.required],
        fecha: [null],
        otros: [null]
      }),
      reparaciones: this.formBuilder.array([], [])
    });
  }

  private setupFormListeners(): void {
    this.formularioFicha.get('ficha.id_cliente')?.valueChanges.pipe(
      tap(() => {
        this.paginaCargada = false;
        // Resetear el control de id_vehiculo cuando cambia el cliente
        this.formularioFicha.get('ficha.id_vehiculo')?.reset();
      }),
      switchMap(id_cliente => this.vehiculoService.getVehiculoCliente(id_cliente)),
      tap(vehiculos => {
        this.vehiculos = vehiculos;
        this.paginaCargada = true;
      }),
      catchError(err => {
        this.modal.mostrar('error', 'Error al cargar los datos');
        return of([]);
      })
    ).subscribe();
  }

  private loadInitialData(): void {
    this.clienteService.getClientes().pipe(
      tap(clientes => this.clientes = clientes),
      switchMap(() => this.reparacionService.getReparaciones()),
      tap(reparaciones => {
        this.listaReparaciones = reparaciones;
        this.setReparaciones();
      }),
      catchError(err => {
        this.modal.mostrar('error', 'Error al cargar los datos');
        return of([]);
      })
    ).subscribe();
  }

  private setReparaciones(): void {
    this.listaReparacionesTransfer = this.listaReparaciones.map(reparacion => ({
      key: reparacion.id_reparacion,
      title: reparacion.tipo_reparacion,
      direction: 'left'
    }));
    this.paginaCargada = true;
  }

  get reparaciones(): FormArray {
    return this.formularioFicha.get('reparaciones') as FormArray;
  }

  private addReparacion(id_reparacion: number): void {
    const group = this.formBuilder.group({
      id_reparacion: [id_reparacion, Validators.required],
      informacion_adicional: this.createInformacionAdicional(id_reparacion)
    });
    this.reparaciones.push(group);
  }

  private createInformacionAdicional(key: number): AbstractControl {
    switch (key) {
      case 4:
      case 9:
      case 13:
      case 14:
      case 15:
        return this.formBuilder.group({
          kilometraje_actual: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
          kilometraje_siguiente: [null, [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
      case 21:
        return this.formBuilder.group({
          ruedas: [[], Validators.required],
        });
      case 22:
      case 23:
      case 24:
        return this.formBuilder.group({
          zona: [null, Validators.required],
        });
      default:
        return this.formBuilder.control(null);
    }
  }

  handleTransferChange(ret: {}) {
    this.reparaciones.clear();
    this.listaReparacionesTransfer.forEach((item: TransferItem) => {
      if (item.direction === 'right') {
        this.addReparacion(Number(item['key']));
      }
    });
  }

  filterOption(inputValue: string, item: TransferItem): boolean {
    return item.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  }

  getNombreReparacion(id_reparacion: number): string {
    return this.listaReparaciones.find(reparacion => reparacion.id_reparacion === id_reparacion)?.tipo_reparacion || '';
  }

  onSubmit(): void {
    if (this.formularioFicha.valid && (this.reparaciones.length > 0 || this.formularioFicha.get('ficha.otros')?.value)) {
      this.status = 'loading';
      this.fichaService.createFicha(this.formularioFicha.value).pipe(
        tap(() => {
          this.status = 'success';
          this.modal.mostrar('success', 'Ficha creada correctamente', '/admin/fichas/lista');
        }),
        catchError(error => {
          this.status = 'failed';
          this.modalError(error);
          return of(null);
        })
      ).subscribe();
    } else {
      this.status = 'failed';
      this.modal.mostrar('error', 'Debe seleccionar al menos una reparación o agregar información en Otros');
    }
  }

  cancelar(): void {
    this.router.navigate(['admin', 'fichas', 'lista']);
  }

  private modalError(error: any): void {
    let errorMsg = `${error.error.message}\n`;
    if (error.error.errors) {
      Object.keys(error.error.errors).forEach(key => {
        errorMsg += `${error.error.errors[key]}\n`;
      });
    }
    this.modal.mostrar('error', errorMsg);
  }
}