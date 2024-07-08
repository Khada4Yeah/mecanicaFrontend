import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VehiculoService } from '../../../../core/services/vehiculo.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';
import { EncryptionService } from '../../../../core/services/encryption.service';
import { RequestStatus } from '../../../../core/models/request-status.model';
import { ModalService } from '../../../../core/services/modal.service';

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
  private modal = inject(ModalService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder, private vehiculoService: VehiculoService, private clienteService: ClienteService) {
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
        this.getClientes();
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

          this.formularioVehiculo.patchValue(vehiculo);
          this.formularioVehiculo.get('id_cliente')?.setValue(vehiculo.cliente.id_cliente);

        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.paginaCargada = true;
        }
      });
    }
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

  // Guardar o actualizar vehiculo
  saveVehiculo(): void {
    this.status = 'loading';
    if (this.formularioVehiculo.valid) {
      if (this.esModoEditar) {
        // Llamar al servicio de actualización de vehiculo
        this.vehiculoService.updateVehiculo(this.formularioVehiculo.value, Number(this.vehiculoId)).subscribe({
          next: (vehiculo) => {
            this.status = 'success';
            this.modal.mostrar('success', 'Vehiculo actualizado correctamente', '/admin/vehiculos/lista');
          },
          error: (error) => {
            this.status = 'failed';
            this.modalError(error);
          },
          complete: () => {

          }
        });
      }
      else {
        this.vehiculoService.createVehiculo(this.formularioVehiculo.value).subscribe({
          next: (vehiculo) => {
            this.status = 'success';
            this.modal.mostrar('success', 'Vehiculo creado correctamente', '/admin/vehiculos/lista');
          },
          error: (error) => {
            this.status = 'failed';
            // En caso de error, se muestra un modal con el mensaje de error
            this.modalError(error);
          },
          complete: () => {

          }
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['admin', 'vehiculos', 'lista']);
  }

  private modalError(error: any): void {
    let string = error.error.message + '\n';
    if (error.error.errors) {
      Object.keys(error.error.errors).forEach((key) => {
        string += `${error.error.errors[key]}\n`;
      });
    }
    this.modal.mostrar('error', string);
  }

}
