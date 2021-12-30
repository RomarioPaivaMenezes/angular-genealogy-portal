import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { CadastroCasamentoComponent } from './cadastro-casamento/cadastro-casamento.component';
import { CasamentoPesquisaComponent } from './casamento-pesquisa/casamento-pesquisa.component';


const routes: Routes = [
  /* {path: '', redirectTo: 'casamentos', pathMatch: 'prefix'},*/
  
   {
     path: 'casamentos', 
     component: CasamentoPesquisaComponent,
     canActivate: [AuthGuard],
     data: {roles: ['ROLE_PESQUISAR_CASAMENTO']}
    },
   {
     path: 'casamentos/novo', 
     component: CadastroCasamentoComponent,
     canActivate: [AuthGuard],
     data: {roles: ['ROLE_CADASTRAR_CASAMENTO'] }
    },
   {
     path: 'casamentos/:codigo', 
     component: CadastroCasamentoComponent, 
     canActivate: [AuthGuard],
     data: {roles: ['ROLE_CADASTRAR_CASAMENTO']}
   }
 ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CasamentoRoutingModule { }
