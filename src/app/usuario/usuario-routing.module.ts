import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { PesquisaUsuarioComponent } from './pesquisa-usuario/pesquisa-usuario.component';



const routes: Routes = [
  
   {
     path: 'usuario/novo', 
     component: CadastroUsuarioComponent,
     canActivate: [AuthGuard],
     data: {roles: ['ROLE_CADASTRAR_USUARIO']}
    },

    {
      path: 'usuario/pesquisar', 
      component: PesquisaUsuarioComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_PESQUISAR_USUARIO']}
     },
     {
      path: 'usuario/:codigo', 
      component: CadastroUsuarioComponent, 
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_REMOVER_USUARIO']}
    }
  
 
 ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
