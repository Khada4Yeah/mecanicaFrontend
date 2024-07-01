import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VehiculoService } from '../../../../core/services/vehiculo.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';
import { EncryptionService } from '../../../../core/services/encryption.service';
import { RequestStatus } from '../../../../core/models/request-status.model';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrl: './crear-vehiculo.component.scss'
})
export class CrearVehiculoComponent implements OnInit {
  paginaCargada: boolean = false;
  formularioVehiculo!: FormGroup;
  clientes: Cliente[] = [];
  status: RequestStatus = 'init';
  vehiculoId: number | null = null;
  esModoEditar: boolean = false;


  private encryptionService = inject(EncryptionService);
  private route = inject(ActivatedRoute);

  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService, private router: Router, private clienteService: ClienteService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const encryptedId = params.get('id');
      if (encryptedId) {
        this.vehiculoId = Number(this.encryptionService.decrypt(encryptedId));
        this.esModoEditar = !!this.vehiculoId;
        if (this.esModoEditar) {
          this.getClientes();
          this.loadVehiculo();
        }
      } else {
        this.paginaCargada = true;
      }
    });
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

  private loadVehiculo(): void {
    if (this.vehiculoId) {
      this.vehiculoService.getVehiculo(this.vehiculoId).subscribe({
        next: (vehiculo) => {
          console.log(vehiculo);

          this.formularioVehiculo.patchValue(vehiculo);
          this.formularioVehiculo.get('id_cliente')?.setValue(vehiculo.cliente.id_cliente);
          this.paginaCargada = true;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {

        }
      });
    }
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


}
