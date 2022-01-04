import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadoComponent } from './core-module/nao-autorizado.component';

import { PaginaNaoEncontradaComponent } from './core-module/pagina-nao-encontrada.component';

const routes: Routes = [
  /* {path: '', redirectTo: 'casamentos', pathMatch: 'prefix'},*/
  {
    path: 'casamentos', 
    loadChildren: () => import('../app/casamentos/casamentos.module').then(m => m.CasamentosModule) 
   },
   {
     path: '', 
     redirectTo: 'casamentos', 
     pathMatch: 'full'
    },
   {
     path: 'nao-autorizado', 
     component: NaoAutorizadoComponent
    },
   {
     path: 'pagina-nao-encontrada', 
     component: PaginaNaoEncontradaComponent
    },
   {
     path: '**', 
     redirectTo: 'pagina-nao-encontrada'
    },
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
