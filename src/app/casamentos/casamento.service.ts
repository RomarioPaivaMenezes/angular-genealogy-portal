import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../core-module/error-handler.service';
import { Casamento } from '../core-module/model';


export class CasamentoFiltro{

    nomeNoivo = '';
    nomeNoiva = '';
    paisNoivo = '';
    paisNoiva = '';
    testemunhas = '';
    localizacao: number = 0;
    
    dataCasamentoDe?: Date;
    dataCasamentoAte?: Date;
    pagina: number= 0;
    itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class CasamentoService {


  casamentoUrl: string;
  constructor(
    private http: HttpClient, 
    private datePipe: DatePipe) {
      this.casamentoUrl = environment.apiUrl + '/casamentos';
   }

  pesquisar(filtro: any): Promise<any> {
 
   let params = new HttpParams();

   params = params.set('page', filtro.pagina);
   params = params.set('size', filtro.itensPorPagina);
   
   if(filtro.localizacao){
    params = params.set('localizacao', filtro.localizacao);
   }

   if(filtro.nomeNoivo){
     params = params.set('nomeNoivo', filtro.nomeNoivo);
   }

   if(filtro.nomeNoiva){
    params = params.set('nomeNoiva', filtro.nomeNoiva);
  }

  if(filtro.paisNoivo){
    params = params.set('paisNoivo', filtro.paisNoivo);
  }

  if(filtro.paisNoiva){
    params = params.set('paisNoiva', filtro.paisNoiva);
  }

  if(filtro.testemunhas){
    params = params.set('testemunhas', filtro.testemunhas);
  }

   if(filtro.dataCasamentoDe) {
    params = params.set('dataCasamentoDe', this.datePipe.transform(filtro.dataCasamentoDe, 'yyyy-MM-dd')!);
  }

  if (filtro.dataCasamentoAte) {
    params = params.set('dataCasamentoAte', this.datePipe.transform(filtro.dataCasamentoAte, 'yyyy-MM-dd')!);
  }

  const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
   
    return this.http.get(`${this.casamentoUrl}`, {headers, params})
     .toPromise()
      .then((response: any) =>  {
        const casamentos = response['content'];

        const resultado = {
          casamentos: casamentos,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void | null>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    return this.http.delete(`${this.casamentoUrl}/${codigo}`, {headers})
    .toPromise()
    .then(()=> null);
 
  }


  adicionar(casamento: Casamento): Promise<Casamento | any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
  
    return this.http.post<Casamento>(this.casamentoUrl, casamento, { headers })
      .toPromise();
  }

   atualizar(casamento: Casamento){

    return this.http.put<Casamento>(`${this.casamentoUrl}/${casamento.codigo}`, casamento)
    .toPromise()
    .then((response : any)=> {
      return response['content'];
    });
  }

   buscarPorCodigo(codigo: number):  Promise<Casamento>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    return this.http.get(`${this.casamentoUrl}/${codigo}`, {headers})
    .toPromise()
    .then((response : any)=> {
       this.converterStringsParaData([response]);
       return response;
    });
  }

  private converterStringsParaData(casamentos: Casamento[] | any){
    for (const casamento of casamentos) {
      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;
      
      casamento.dataCasamento = new Date(new Date(casamento.dataCasamento).getTime() + offset);

      if (casamento.dataCasamento) {
        casamento.dataCasamento = new Date(new Date(casamento.dataCasamento).getTime() + offset);
      }
    }

  }

 
}
 