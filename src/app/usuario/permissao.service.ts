import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  permissoesUrl = '';

  constructor(private http: HttpClient) { 
    this.permissoesUrl = environment.apiUrl + '/permissoes';
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.permissoesUrl, { headers })
      .toPromise();
  }

}