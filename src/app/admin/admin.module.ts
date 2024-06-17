import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NgZorroModule } from '../ng-zorro/ng-zorro.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
