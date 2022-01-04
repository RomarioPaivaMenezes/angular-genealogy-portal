import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CalendarModule } from 'primeng/calendar';
import { TooltipModule} from 'primeng/tooltip';
import { TableModule } from 'primeng/table';  
import { InputMaskModule} from 'primeng/inputmask';
import { DropdownModule} from 'primeng/dropdown';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { InputTextModule} from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { CadastroCasamentoComponent } from './cadastro-casamento/cadastro-casamento.component';
import { SharedModule } from '../shared/shared.module';
import { CasamentoPesquisaComponent } from './casamento-pesquisa/casamento-pesquisa.component';
import { PesquisaGridComponent } from './pesquisa-grid/pesquisa-grid.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {PanelModule} from 'primeng/panel';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { CasamentoRoutingModule } from './casamento-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    InputTextModule,
    SharedModule,
    TooltipModule,
    TableModule,
    ButtonModule,

    ScrollingModule,
    ConfirmDialogModule,
    PanelModule,
    InputMaskModule,
    MenuModule,

    ToastModule,
    CasamentoRoutingModule
  ],
  declarations: [CadastroCasamentoComponent, CasamentoPesquisaComponent, PesquisaGridComponent],
  exports: [
      CadastroCasamentoComponent, 
      CasamentoPesquisaComponent],
  providers:[
      MessageService, 
      ConfirmationService]
})
export class CasamentosModule {

 }
