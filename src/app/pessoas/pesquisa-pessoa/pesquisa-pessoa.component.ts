import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-pessoa',
  templateUrl: './pesquisa-pessoa.component.html',
  styleUrls: ['./pesquisa-pessoa.component.css']
})
export class PesquisaPessoaComponent {

  registroCasamento = [
    { noivo: 'José da Silva', noiva: 'Maria Joaquina', paisNoivo: 'Manoel e Joaquina', 
    paisNoiva: 'Pedro e Isabel', testemunhas: 'Antônio José e Manoel Antônio', 
    informacoes: 'Naturais e Moradores', dataCasamento: new Date(2017, 6, 3),
    local: 'Apodi-RN', ativo: true},

    { noivo: 'Pedro Paiva', noiva: 'Joana Ferreira', paisNoivo: 'Manoel de Paiva', 
    paisNoiva: 'Gabriel e Maria', testemunhas: 'Antônio José e Manoel Antônio', 
    informacoes: 'Naturais e Moradores', dataCasamento: new Date(1860, 10, 2),
    local: 'Martins-RN', ativo: false}

  ];



}
