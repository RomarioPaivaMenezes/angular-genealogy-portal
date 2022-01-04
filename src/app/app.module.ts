import { NgModule } from '@angular/core';
import { BrowserModule, Title  }  from  '@angular/platform-browser';
import { AppComponent } from './app.component';

import { DatePipe, registerLocaleData } from '@angular/common';

import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core-module/core.module';
import { CasamentoService } from './casamentos/casamento.service';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './core-module/error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { UsuarioModule } from './usuario/usuario.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,    

    CoreModule,
    PessoasModule,
    SegurancaModule,
    UsuarioModule,

    AppRoutingModule
 ],  
  providers: [
    CasamentoService, 
    DatePipe,
    ErrorHandlerService,
    
    MessageService,
    ConfirmationService,

    Title
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
