import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import {PasswordModule} from 'primeng/password';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app.http.Interceptor';
import { AuthGuard } from './auth.guard';
import { environment } from 'src/environments/environment';


export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    InputTextModule,

    ToastModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.tokenAllowedDomains.toString()],
        disallowedRoutes: ['/oauth/token/']
      }       
    }),

  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
