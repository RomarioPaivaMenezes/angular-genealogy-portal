import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit {

  exibindoMenu: boolean = false;

  usuarioLogado: string = '';

  usuarioMenu: MenuItem[] = [];
  itemsMenu: MenuItem[] = [];
  
    constructor(
        private auth: AuthService,
        private logoutService: LogoutService,
        private errorHandler: ErrorHandlerService,
        private router: Router) { }
  
    ngOnInit() {
      this.usuarioLogado = this.auth.jwtPayload?.nome;

      this.usuarioMenu = [
        {
            label: this.usuarioLogado,
            items: [{
                    label: 'LogOut', 
                    icon: 'pi pi-pw pi-power-off',
                    command: ((event?: any) => {this.logout()})  ,
                    
                }
            ]
        }];


      this.itemsMenu = [
        {
            label: 'Casamento',
            icon: 'pi pi-pw pi-file',
            items: [{
                    label: 'Novo Casamento', 
                    icon: 'pi pi-fw pi-plus',
                    routerLink: ['/casamentos/novo'],
                    visible: this.temPermissao('ROLE_CADASTRAR_CASAMENTO')
                },
                {
                     label: 'Pesquisar', 
                     icon: 'pi pi-fw pi-search',
                     routerLink: ['/casamentos'],
                     visible: this.temPermissao('ROLE_PESQUISAR_CASAMENTO')
                },
                {separator: true},
                {    label: 'Editar', 
                      icon: 'pi pi-fw pi-pencil',
                      routerLink: ['/casamentos/1'],
                      visible: this.temPermissao('ROLE_EDITAR_CASAMENTO')
                }
            ]
        } ,
        {
          label: 'Controle Batismos',
          icon: 'pi pi-pw pi-file',
          items: [{
                  label: 'Novo Batismo', 
                  icon: 'pi pi-fw pi-plus',
                  routerLink: ['/batismos/novo'],
                  visible: this.temPermissao('ROLE_CADASTRAR_CASAMENTO')
              },
              {
                   label: 'Pesquisar', 
                   icon: 'pi pi-fw pi-search',
                   routerLink: ['/batismos'],
                   visible: this.temPermissao('ROLE_PESQUISAR_CASAMENTO')
              },
              {separator: true},
              {    label: 'Editar', 
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['//batismos/1'],
                    visible: this.temPermissao('ROLE_EDITAR_CASAMENTO')
              }
          ]
      } ,
        {
          label: 'Controle Usuário',
          icon: 'pi pi-pw pi-user',
          items: [{
                  label: 'Cadastrar', 
                  icon: 'pi pi-fw pi-plus',
                  routerLink: ['/usuario/novo'],
                    visible: this.temPermissao('ROLE_CADASTRAR_USUARIO')
                  
              },
              {
                   label: 'Pesquisar', 
                   icon: 'pi pi-fw pi-search',
                   routerLink: ['/usuario/pesquisar'],
                   visible: this.temPermissao('ROLE_PESQUISAR_USUARIO')
                  },
              {separator: true},
              {    label: 'Editar', 
                    icon: 'pi pi-fw pi-pencil'}
          ]
      } ,
      {
        label: 'LogOut', 
        icon: 'pi pi-pw pi-power-off',
        command: ((event?: any) => {this.logout()}) 
      }
      ];
      
    }

    temPermissao(permissao: string) {
      return this.auth.temPermissao(permissao);
    }

    logout() {
      this.logoutService.logout()
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

}
