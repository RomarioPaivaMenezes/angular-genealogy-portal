import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {

  localizacaoUrl = '';

  constructor(private http: HttpClient) { 
    this.localizacaoUrl = environment.apiUrl+'/localizacao';
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.localizacaoUrl, { headers })
      .toPromise();
  }

}
