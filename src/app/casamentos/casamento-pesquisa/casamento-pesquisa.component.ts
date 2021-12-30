import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core-module/error-handler.service';
import { CasamentoFiltro, CasamentoService } from '../casamento.service';
import { LocalizacaoService } from '../localizacao.service';



@Component({
  selector: 'app-casamento-pesquisa',
  templateUrl: './casamento-pesquisa.component.html',
  styleUrls: ['./casamento-pesquisa.component.css'],
  exportAs: 'CasamentoPesquisaComponent'
})
export class CasamentoPesquisaComponent implements OnInit {
  
  locais = [];
  local: any;
  totalElementos = 0;
  filtro = new CasamentoFiltro();
  registroCasamento: any [] = [];

  constructor(
    private casamentoService: CasamentoService,
    private errorHandleService: ErrorHandlerService,
    private localizacaoService:LocalizacaoService,
    private title: Title) {}

  ngOnInit() {
    //this.pesquisar();
    this.title.setTitle('Pesquisa de Casamentos');
    this.carregarLocalizacao();
  }

  pesquisar(pagina: number = 0): void {        
    this.filtro.pagina = pagina;
    this.filtro.localizacao = this.local;

    console.log('Localizacao selecionada: '+this.local);

    this.casamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.registroCasamento = resultado.casamentos;
      this.totalElementos = resultado.total;
    }).catch(erro =>{
      this.errorHandleService.handle(erro);
    })
  }

  carregarLocalizacao(){
    return this.localizacaoService.listarTodas()
    .then(
      locais =>{
      this.locais = locais.map((c: any) => ({ label: c.cidade, value: c.codigo}))
    })
    .catch(
      erro=> this.errorHandleService.handle(erro)
    );

  }
 
  
}
