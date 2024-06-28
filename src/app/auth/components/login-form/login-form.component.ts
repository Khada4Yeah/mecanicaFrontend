import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../../core/services/auth.service';
import { RequestStatus } from '../../../core/models/request-status.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  paginaCargada: boolean = false;
  formularioLogin!: FormGroup;
  status: RequestStatus = 'init';
  contrasenaVisible = false;


  constructor(private formBuilder: FormBuilder, private router: Router, private modal: NzModalService, private authService: AuthService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.paginaCargada = true;
  }

  modalError(mensaje: string): void {
    this.modal.error({
      nzTitle: 'Error',
      nzContent: mensaje,
    });
  }

  login(): void {
    this.status = 'loading';
    if (this.formularioLogin.valid) {
      this.authService.login(this.formularioLogin.value.correo_electronico, this.formularioLogin.value.clave).subscribe({
        next: (data) => {
          this.status = 'success';
          console.log(data);
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.status = 'failed';
          this.modalError(err.error.message);
        },
        complete: () => {

        }
      });
    }
  }

  private buildForm(): void {
    this.formularioLogin = this.formBuilder.group({
      correo_electronico: [null, [Validators.required, Validators.email]],
      clave: [null, [Validators.required]],
    }
    );
  }

}
