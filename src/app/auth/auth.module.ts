import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { NgZorroModule } from '../ng-zorro/ng-zorro.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgZorroModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
