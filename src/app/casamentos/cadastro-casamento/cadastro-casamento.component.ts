import {MenuItem, Message, MessageService} from 'primeng/api';
import { Component, NgModule, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CasamentoService } from '../casamento.service';
import { Casamento } from 'src/app/core-module/model';
import { FormControl, NgForm } from '@angular/forms';
import { LocalizacaoService } from '../localizacao.service';
import { ErrorHandlerService } from 'src/app/core-module/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-cadastro-casamento',
  templateUrl: './cadastro-casamento.component.html',
  styleUrls: ['./cadastro-casamento.component.css'],
  providers: [MessageService]

})
export class CadastroCasamentoComponent  implements OnInit {
  
  msgs1: Message[] = [];
  locais: any [] = [];
  casamento: Casamento = new Casamento();
  
  constructor(
    private messageService: MessageService,
    private errorHandleService: ErrorHandlerService,
    private localizacaoService:LocalizacaoService,
    private casamentoService: CasamentoService,
    private route: ActivatedRoute,
    private navigateRoute: Router,
    private title: Title
    ) {}

    
  salvar(form: NgForm){
    if(this.editando){
      this.atualizarCasamento(form);
    }else{
      this.adicionarCasamento(form);
    }
  }

  adicionarCasamento(form: NgForm){
    this.casamentoService.adicionar(this.casamento)
    .then(() => {

      form.reset();
      this.casamento = new Casamento();
    })
    .catch( erro=> this.errorHandleService.handle(erro));
  }

  atualizarCasamento(form: NgForm){
    this.casamentoService.atualizar(this.casamento)
    .then(casamento => {
      this.casamento = casamento;
      form.reset();

      this.navigateRoute.navigate(['/casamentos']);
    })
    .catch( erro=> this.errorHandleService.handle(erro));
  }

  ngOnInit() {
    this.title.setTitle('Novo Casamento');
     const condigoCasamento = this.route.snapshot.params['codigo'];
     
     if(condigoCasamento){
      this.carregarCasamento(condigoCasamento);
     }
      this.locais = this.carregarLocalizacao();
      this.msgs1 = [
          {severity:'error', summary:'Error', detail:'Message Content'} 
      ];
  }

  get editando(){
    return Boolean(this.casamento.codigo);
  }

  carregarCasamento(codigo: number){
    this.casamentoService.buscarPorCodigo(codigo)
    .then(casamento => {
      this.casamento = casamento;
    }).catch(
      erro=> this.errorHandleService.handle(erro)
    ); 
  }
  carregarLocalizacao(): any{
    return this.localizacaoService.listarTodas()
    .then(
      locais =>{
      this.locais = locais.map((c: any) => ({ label: c.cidade +' - '+c.estado, value: c.codigo}))
    })
    .catch(
      erro=> this.errorHandleService.handle(erro)
    );
    
  }
  
  novo (form: NgForm){
    form.reset();
    this.casamento = new Casamento();
    this.navigateRoute.navigate(['casamentos/novo']);

    /* -- Work Around to set scope
      setTimeout(function (){
      this.casamento = new Casamento();
    }.bind(this), 1);*/

  }

  



}
