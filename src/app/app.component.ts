import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algamoney-ui';
 
  constructor(
    private config: PrimeNGConfig,
    private router: Router
  ) {}

  ngOnInit() {

  }

  exibirNavBar(){
    return this.router.url !== '/login';
  }
  
}
