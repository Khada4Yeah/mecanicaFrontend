import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';


const routes: Routes = [
    {
        path: 'admin', component: NavComponent,
        children: [
            { path: 'vehiculos', loadChildren: () => import('./vehiculos/vehiculos.module').then(m => m.VehiculosModule) },
            { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }