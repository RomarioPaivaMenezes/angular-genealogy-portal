import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { ErrorHandlerService } from './error-handler.service';
import { RouterModule } from '@angular/router';

import {MenubarModule} from 'primeng/menubar';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { AuthService} from '../seguranca/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import {CalendarModule} from 'primeng/calendar';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import {PanelMenuModule} from 'primeng/panelmenu';



import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [
    NavBarComponent, 
    PaginaNaoEncontradaComponent, NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,

    SidebarModule,
    PanelMenuModule,

    ToastModule,
    ConfirmDialogModule,
    
    CalendarModule
    
  ],
  exports: [
    NavBarComponent,
    ConfirmDialogModule,
   
    CalendarModule
  ],
  providers: [
    DatePipe,
    ErrorHandlerService,
    
    MessageService,
    ConfirmationService,
    HttpClient,
    Title,

    AuthService
  ]
})
export class CoreModule { }
