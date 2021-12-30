import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, ConfirmEventType, FilterOperator, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { PrimeNGConfig } from 'primeng/api';



import { CasamentoPesquisaComponent } from '../casamento-pesquisa/casamento-pesquisa.component';
import { CasamentoFiltro, CasamentoService } from '../casamento.service';
import { ErrorHandlerService } from 'src/app/core-module/error-handler.service';
import { LocalizacaoService } from '../localizacao.service';
import { __values } from 'tslib';
import { Casamento } from 'src/app/core-module/model';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  providers:[CasamentoPesquisaComponent ],
  selector: 'app-pesquisa-grid',
  templateUrl: './pesquisa-grid.component.html',
  styleUrls: ['./pesquisa-grid.component.css']
})
export class PesquisaGridComponent implements OnInit {


  @Input() registroCasamento: any = {};
  @Input() filtro: CasamentoFiltro | any;
  @Input() totalElementos = 0;
  @ViewChild('tabela') grid!: Table;

  casamento: any;
  locais = [];

  constructor(private casamentoService: CasamentoService,
                private messageService: MessageService,
                private primengConfig: PrimeNGConfig,
                private confirmationService: ConfirmationService,
                private errorHandlerService: ErrorHandlerService,
                private auth: AuthService
             
                ) { 

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    
  }

  getAuth(){
    return this.auth;
  }

  pesquisa(){
    this.casamentoService.pesquisar(this.filtro).then(resultado => {
      this.registroCasamento = resultado.casamentos;
      this.totalElementos = resultado.total;
    });
  }
  
  aoMudarPagina(event: LazyLoadEvent){
    const pagina: number = event!.first! / event!.rows!;
    this.filtro.pagina = pagina;
    console.log(this.filtro);
    this.pesquisa();
  }

  excluir(casamento: Casamento){  
    console.log(casamento);
    this.casamentoService.excluir(casamento.codigo)
    .then(()=>{
      //this.grid.reset();
      this.casamento = null;
      this.pesquisa();
      
    }).catch(erro =>{
        this.errorHandlerService.handle(erro);
    });
  }

  confirmarExclusao(casamento: any) {
    this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluír este registro?',
        header: 'Confirmar exclusão de Registro',
        accept: () => {
          this.onConfirm(casamento);
          this.messageService.add({severity:'info', summary:'Confirmado', detail:'Registro Deletado'});
        }, reject: (type: any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Rejeitado', detail:'Operação rejeitada, registro não deletado!'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Operação cancelou, registro não deletado!"'});
              break;
          }
      }
    });
  }


  onConfirm(casamento: any) {
    this.casamento = casamento;
    this.excluir(this.casamento);
    
    this.messageService.clear('c');
}

  onReject() {
      this.messageService.clear('c');
      this.casamento = null;
  }


  clear() {
  this.messageService.clear();
  }

 
}
