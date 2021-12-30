import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';

import {PickListModule} from 'primeng/picklist';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PesquisaUsuarioComponent } from './pesquisa-usuario/pesquisa-usuario.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    PesquisaUsuarioComponent,
    
  ], 
  exports: [
    CadastroUsuarioComponent
  ],
  imports: [
    CommonModule,
    PickListModule,
    UsuarioRoutingModule,

    InputTextModule,
    SharedModule,
    TooltipModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ConfirmDialogModule,
    PanelModule, 
    FormsModule,
    ToastModule
  ],
  providers:[
    MessageService, 
    ConfirmationService
  ]
})
export class UsuarioModule { }
