import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../core-module/error-handler.service';
import { Casamento, Usuario } from '../core-module/model';


export class UsuarioFiltro{
    nome = '';
    email = '';
    pagina: number= 0;
    itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuarioUrl = '';
  constructor(
    private http: HttpClient, 
    private datePipe: DatePipe) {

      this.usuarioUrl = environment.apiUrl + '/usuarios';
   }

  pesquisar(filtro: any): Promise<any> {
 
   let params = new HttpParams();

   params = params.set('page', filtro.pagina);
   params = params.set('size', filtro.itensPorPagina);
   

   if(filtro.nome){
     params = params.set('nome', filtro.nome);
   }

   if(filtro.email){
    params = params.set('email', filtro.email);
  }

  const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
   
    return this.http.get(`${this.usuarioUrl}`, {headers, params})
     .toPromise()
      .then((response: any) =>  {
        const usuarios = response['content'];

        const resultado = {
          usuarios: usuarios,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void | null>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    return this.http.delete(`${this.usuarioUrl}/${codigo}`, {headers})
    .toPromise()
    .then(()=> null);
 
  }


  adicionar(usuario: Usuario): Promise<Usuario | any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
  
    return this.http.post<Usuario>(this.usuarioUrl, usuario, { headers })
      .toPromise();
  }

   atualizar(usuario: Usuario){
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');
    return this.http.put<Usuario>(`${this.usuarioUrl}/${usuario.codigo}`, usuario, {headers})
    .toPromise()
    .then((response : any)=> {
      return response['content'];
    });
  }

   buscarPorCodigo(codigo: number):  Promise<Casamento>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    
    return this.http.get(`${this.usuarioUrl}/${codigo}`, {headers})
    .toPromise()
    .then((response : any)=> {
      // this.converterStringsParaData([response]);
       return response;
    });
  }

/*  private converterStringsParaData(usuarios: Usuario[] | any){
    for (const casamento of usuarios) {
      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;
      
      casamento.dataCasamento = new Date(new Date(casamento.dataCasamento).getTime() + offset);

      if (casamento.dataCasamento) {
        casamento.dataCasamento = new Date(new Date(casamento.dataCasamento).getTime() + offset);
      }
    }
*/
  }

 
