import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { VehiculoService } from '../../../../core/services/vehiculo.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrl: './crear-vehiculo.component.scss'
})
export class CrearVehiculoComponent implements OnInit {
  paginaCargada: boolean = false;
  formularioVehiculo!: FormGroup;
  clientes: Cliente[] = [];

  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService, private router: Router, private clienteService: ClienteService, private location: Location) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getClientes();
  }

  private buildForm(): void {
    this.formularioVehiculo = this.formBuilder.group({
      placa: [null, [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$/)]],
      marca: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      chasis: [null, [Validators.required]],
      motor: [null, [Validators.required]],
      id_cliente: [null, [Validators.required]],
    });
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
    });
  }

  saveVehiculo(): void {
    if (this.formularioVehiculo.valid) {
      this.vehiculoService.createVehiculo(this.formularioVehiculo.value).subscribe({
        next: (vehiculo) => {
          console.log(vehiculo);
          this.router.navigate(['/admin/vehiculos']);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {

        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
