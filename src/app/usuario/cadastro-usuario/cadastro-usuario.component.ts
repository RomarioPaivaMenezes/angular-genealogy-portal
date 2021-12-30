
import { JsonPipe } from '@angular/common';
import { UnaryOperator } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core-module/error-handler.service';
import { Permissao, Usuario } from 'src/app/core-module/model';
import { PermissaoService } from '../permissao.service';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  senhaConfirmar: String = '';

  permissoes!: Permissao[];
  permissoesDoUsuario: Permissao[] = [];

  ngOnInit() {
    this.title.setTitle('Novo Usuário');
    const condigoUsuario = this.route.snapshot.params['codigo'];
    
    if(condigoUsuario){
      this.carregarUsuario(condigoUsuario);
    }
    this.carregarPermissoes();
  
     this.msgs1 = [
         {severity:'error', summary:'Error', detail:'Message Content'} 
     ];
  }



  msgs1: Message[] = [];
  usuario: Usuario = new Usuario();
  
  constructor(
    private messageService: MessageService,
    private errorHandleService: ErrorHandlerService,
    private usuarioService: UsuarioService,
    private permissoesService: PermissaoService,
    private route: ActivatedRoute,
    private navigateRoute: Router,
    private title: Title
    ) {}

   verificarSenha(): boolean{

      if(this.usuario.senha){
          if(this.senhaConfirmar === this.usuario.senha){
              return true;    
          }else{
            this.errorHandleService.handle('Senhas não conferem.');
          }
      }

    return false;
   }
    
  salvar(form: NgForm){

    if(this.verificarSenha()){
      
      if(this.editando){
        console.log('estou aqui');
        this.atualizarUsuario(form);
      }else{
        this.adicionarUsuario(form);
      }
   }
  }

  adicionarUsuario(form: NgForm){

    if(!(this.usuario.permissoes.length > 0)){
       let permStandad: Permissao = new Permissao();
       permStandad.codigo = 3;
       let newPermissao:Permissao [] = [permStandad];
       this.usuario.permissoes = newPermissao;
    }
    this.usuarioService.adicionar(this.usuario)
    .then(() => {
      form.reset();
      this.usuario = new Usuario();
    })
    .catch( erro=> this.errorHandleService.handle(erro));
  }

  atualizarUsuario(form: NgForm){
  console.log('Estou aqui.')
    this.usuarioService.atualizar(this.usuario)
    .then(usuario => {
       this.usuario = new Usuario();
       form.reset();
      
      this.navigateRoute.navigate(['/usuario/pesquisar']);
    })
    .catch( erro=> this.errorHandleService.handle(erro));
  }

  get editando(){
    return Boolean(this.usuario.codigo);
  }

  carregarUsuario(codigo: number){
    this.usuarioService.buscarPorCodigo(codigo)
    .then((usuario: any) => {
      this.usuario = usuario;
      this.permissoesDoUsuario = this.usuario.permissoes;
      this.usuario.senha = '';
    }).catch(
      erro => this.errorHandleService.handle(erro)
    ); 
  }

  novo (form: NgForm){
    form.reset();
    this.usuario = new Usuario();
    this.navigateRoute.navigate(['usuario/novo']);
  }

  carregarPermissoes(){
    return this.permissoesService.listarTodas()
    .then(
      permissoes =>{

            this.permissoes = permissoes;
            
            for (let index = 0; index < this.usuario.permissoes.length; index++) {
              const up = this.usuario.permissoes[index];
                  this.permissoes.forEach((p, id) =>{
                    if(p.descricao === up.descricao){
                      console.log(p.descricao +' - ' + up.descricao);
                       this.permissoes.splice(id,1);
                    }
                })  
       
      }
      
      }).catch( erro => this.errorHandleService.handle(erro));

      
    
  }
  


}
