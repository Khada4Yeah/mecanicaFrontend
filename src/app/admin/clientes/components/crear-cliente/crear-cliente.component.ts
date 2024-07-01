import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ModalService } from '../../../../core/services/modal.service';
import { RequestStatus } from '../../../../core/models/request-status.model';
import { EncryptionService } from '../../../../core/services/encryption.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.scss'
})
export class CrearClienteComponent {
  paginaCargada: boolean = false;
  formularioCliente!: FormGroup;
  clientes: Cliente[] = [];
  status: RequestStatus = 'init';
  esModoEditar: boolean = false;
  clienteId: number | null = null;
  usuarioId: number = 0;

  private encryptionService = inject(EncryptionService);
  private route = inject(ActivatedRoute);

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private modal: ModalService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const encryptedId = params.get('id');
      if (encryptedId) {
        this.clienteId = Number(this.encryptionService.decrypt(encryptedId));
        this.esModoEditar = !!this.clienteId;
        if (this.esModoEditar) {
          this.loadCliente();
        }
      } else {
        this.paginaCargada = true;
      }
    });

  }

  private buildForm(): void {
    this.formularioCliente = this.formBuilder.group({
      cedula: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombres: [null, [Validators.required,]],
      apellido_p: [null, [Validators.required]],
      apellido_m: [null, [Validators.required]],
      correo_electronico: [null, [Validators.required, Validators.email]],
      celular: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  private loadCliente(): void {
    if (this.clienteId) {
      this.clienteService.getCliente(this.clienteId).subscribe(cliente => {
        this.usuarioId = cliente.usuario.id_usuario;
        this.formularioCliente.patchValue(cliente.usuario);
        this.paginaCargada = true;
      });
    }
  }

  //Guardar cliente
  saveCliente(): void {
    this.status = 'loading';
    if (this.formularioCliente.valid) {
      if (this.esModoEditar) {
        console.log(this.formularioCliente.value);

        //Llamar al servicio de actualización de cliente
        this.clienteService.updateCliente(this.formularioCliente.value, this.usuarioId).subscribe({
          next: (cliente) => {
            this.status = 'success';
            this.modal.mostrar('success', 'Cliente actualizado correctamente', '/admin/clientes/lista');
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
        this.clienteService.createCliente(this.formularioCliente.value).subscribe({
          next: (cliente) => {
            this.status = 'success';
            this.modal.mostrar('success', 'Cliente creado correctamente', '/admin/clientes/lista');
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
