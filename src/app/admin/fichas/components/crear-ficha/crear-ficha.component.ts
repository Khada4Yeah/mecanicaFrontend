import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../core/models/cliente.model';
import { Vehiculo } from '../../../../core/models/vehiculo.model';
import { Reparacion } from '../../../../core/models/reparacion.model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../../../core/services/vehiculo.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ReparacionService } from '../../../../core/services/reparacion.service';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { createFichaDTO } from '../../../../core/models/ficha.model';
import { FichaReparacion } from '../../../../core/models/ficha_reparacion.model';
interface ControlAdicional {
  label: string;
  controles: string[];
  id_reparacion?: number;
}

@Component({
  selector: 'app-crear-ficha',
  templateUrl: './crear-ficha.component.html',
  styleUrls: ['./crear-ficha.component.scss']
})
export class CrearFichaComponent implements OnInit {

  paginaCargada: boolean = false;
  formularioFicha!: FormGroup;

  clientes: Cliente[] = [];
  vehiculos: Vehiculo[] = [];
  listaReparaciones: Reparacion[] = [];
  listaReparacionesTransfer: TransferItem[] = [];
  muestraAdicional: boolean = false;


  constructor(private fb: FormBuilder, private vehiculoService: VehiculoService, private clienteService: ClienteService, private reparacionService: ReparacionService) {
    this.buildForm();
  }

  ngOnInit() {
    this.getClientes();
    this.formularioFicha.get('ficha.id_cliente')?.valueChanges.subscribe((id_cliente: number) => {
      console.log('etrando');

      this.paginaCargada = false;
      this.getVehiculoCliente(id_cliente);
    });
    this.getReparaciones();
  }

  private buildForm(): void {
    this.formularioFicha = this.fb.group({
      ficha: this.fb.group({
        id_cliente: [null, Validators.required],
        id_vehiculo: [null, Validators.required],
        otros: [null, Validators.required]
      }),
      reparaciones: this.fb.array([])
    });
  }

  // Obtiene los clientes
  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;

      },
      error: (err) => {
        console.error(err);
      },
      complete: () => { }
    });
  }

  // Obtiene los vehiculos de un cliente
  getVehiculoCliente(id_cliente: number): void {
    this.vehiculoService.getVehiculoCliente(id_cliente).subscribe({
      next: (vehiculos: Vehiculo[]) => {
        this.vehiculos = vehiculos;

        this.paginaCargada = true;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => { }
    });
  }

  // Obtiene todas las reparaciones
  getReparaciones(): void {
    this.reparacionService.getReparaciones().subscribe({
      next: (reparaciones: Reparacion[]) => {
        this.listaReparaciones = reparaciones;
        this.setReparaciones();

      },
      error: (err) => {
        console.error(err);
      },
      complete: () => { }
    });
  }

  // Setea las reparaciones en el transfer
  setReparaciones(): void {
    this.listaReparaciones.forEach((reparacion: Reparacion) => {
      this.listaReparacionesTransfer.push({
        key: reparacion.id_reparacion,
        title: reparacion.tipo_reparacion,
        direction: 'left'
      });
    });
    this.paginaCargada = true;
  }

  // Obtiene el control de reparaciones del formulario
  get reparaciones(): FormArray {
    return <FormArray>this.formularioFicha.get('reparaciones');
  }

  // Agrega una reparacion al formulario
  addReparacion(id_reparacion: number): void {
    const group = this.fb.group({
      tipo_reparacion: [id_reparacion, Validators.required],
      informacion_adicional: this.createInformacionAdicional(id_reparacion)
    });
    this.reparaciones.push(group);
  }

  // Crea el control de la informacion adicional segun el tipo de reparacion
  createInformacionAdicional(key: number) {
    if ([4, 9, 13, 14, 15].includes(key)) {
      this.muestraAdicional = true;
      return this.fb.group({
        kilometraje_actual: [null, Validators.required],
        kilometraje_siguiente: [null, Validators.required]
      });
    } else if (key === 23) {
      return this.fb.group({
        ruedas: [[], Validators.required],
      });
    } else {
      return this.fb.control(null);
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

  onSubmit() {
    console.log(this.formularioFicha.value);
  }

}