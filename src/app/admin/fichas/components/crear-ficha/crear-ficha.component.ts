import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../core/models/cliente.model';
import { Vehiculo } from '../../../../core/models/vehiculo.model';
import { Reparacion } from '../../../../core/models/reparacion.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../../../core/services/vehiculo.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ReparacionService } from '../../../../core/services/reparacion.service';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-crear-ficha',
  templateUrl: './crear-ficha.component.html',
  styleUrl: './crear-ficha.component.scss'
})
export class CrearFichaComponent implements OnInit {
  paginaCargada: boolean = false;
  formularioFicha!: FormGroup;
  clientes: Cliente[] = [];
  vehiculos: Vehiculo[] = [];
  reparaciones: Reparacion[] = [];
  listaReparacionesTransfer: TransferItem[] = [];
  desactivarTransfer: boolean = false;
  desactivarGenerarCampos: boolean = true;
  mostarCampos: boolean = false;
  nombreControl: string[] = []; //nombre del input de los controles adicionales que se generan en el formulario
  labelControl: string[] = []; //label de los controles adicionales que se generan en el formulario
  idsParaChecar: number[] = [4, 9, 13, 14, 15];

  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService,
    private router: Router, private clienteService: ClienteService, private reparacionService: ReparacionService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getClientes();
    this.getVehiculos();
    this.getReparaciones();

  }

  private buildForm(): void {
    this.formularioFicha = this.formBuilder.group({
      id_vehiculo: [null, [Validators.required]],
      id_cliente: [null, [Validators.required]],
      id_reparacion: [null, [Validators.required]],
      fecha: [Date.now(), [Validators.required]],
    });
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: (vehiculos: Vehiculo[]) => {
        this.vehiculos = vehiculos;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }

  getReparaciones(): void {
    this.reparacionService.getReparaciones().subscribe({
      next: (reparaciones: Reparacion[]) => {
        this.reparaciones = reparaciones;
        this.setReparaciones();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {


      }
    });
  }

  setReparaciones(): void {
    this.reparaciones.forEach((reparacion: Reparacion) => {
      console.log(reparacion);

      this.listaReparacionesTransfer.push({
        key: reparacion.id_reparacion.toString(),
        title: reparacion.tipo_reparacion,
        description: reparacion.tipo_reparacion,
        direction: 'left'
      });
    }
    );
    this.paginaCargada = true;
  }

  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  cambioTransfer(ret: {}): void {
    this.listaReparacionesTransfer.some((item: TransferItem) => {
      if (item.direction === 'right') {
        this.desactivarGenerarCampos = false;
        return true;
      }
      return false;
    });
  }

  generaCamposTransfer(): void {
    console.log(this.listaReparacionesTransfer);
    this.listaReparacionesTransfer.forEach((reparacion: TransferItem) => {
      console.log('rep', reparacion);

      if (reparacion.direction === 'right') {
        if (this.idsParaChecar.includes(Number(reparacion['key']))) {
          this.labelControl.push(reparacion['title']);

          this.nombreControl.push(`kmAct_${reparacion['key']}`);
          this.nombreControl.push(`kmSig_${reparacion['key']}`);

          this.formularioFicha.addControl(`kmAct_${reparacion['key']}`, this.formBuilder.control(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]));
          this.formularioFicha.addControl(`kmSig_${reparacion['key']}`, this.formBuilder.control(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]));
        }
        else if (Number(reparacion['key']) === 23) {
          this.labelControl.push(reparacion['title']);

          this.nombreControl.push(`ruedas_${reparacion['key']}`);
          this.formularioFicha.addControl(`ruedas_${reparacion['key']}`, this.formBuilder.control(null, [Validators.required]));
        }
      }
    });
    console.log(this.formularioFicha.controls);
    this.desactivarGenerarCampos = true;
    this.desactivarTransfer = true;

    this.mostarCampos = true;
  }
}
