import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ModalService } from '../../../../core/services/modal.service';
import { RequestStatus } from '../../../../core/models/request-status.model';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private clienteService: ClienteService, private modal: ModalService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.paginaCargada = true;
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

  //Guardar cliente
  saveCliente(): void {
    this.status = 'loading';
    if (this.formularioCliente.valid) {
      this.clienteService.createCliente(this.formularioCliente.value).subscribe({
        next: (cliente) => {
          this.status = 'success';
          this.modal.mostrar('success', 'Cliente creado correctamente', '/admin/clientes/lista');
        },
        error: (error) => {
          this.status = 'failed';
          // En caso de error, se muestra un modal con el mensaje de error
          let string = error.error.message + '\n';

          if (error.error.errors) {
            Object.keys(error.error.errors).forEach((key) => {
              string += `${error.error.errors[key]}\n`;
            });
          }

          this.modal.mostrar('error', string);

        },
        complete: () => {

        }
      });
    }
  }
}
