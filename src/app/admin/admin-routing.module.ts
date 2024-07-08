import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { authGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: '', component: NavComponent,
        children: [
            { path: 'vehiculos', loadChildren: () => import('./vehiculos/vehiculos.module').then(m => m.VehiculosModule) },
            { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
            { path: 'fichas', loadChildren: () => import('./fichas/fichas.module').then(m => m.FichasModule) },
        ], canActivate: [authGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }