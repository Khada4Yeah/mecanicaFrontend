import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.scss'
})
export class CrearClienteComponent {
  paginaCargada: boolean = false;
  formularioCliente!: FormGroup;
  clientes: Cliente[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private clienteService: ClienteService) {
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

  saveCliente(): void {
    if (this.formularioCliente.valid) {
      this.clienteService.createCliente(this.formularioCliente.value).subscribe({
        next: (cliente) => {
          console.log(cliente);
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
