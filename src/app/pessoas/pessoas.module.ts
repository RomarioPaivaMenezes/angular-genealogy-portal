import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';

import { PesquisaPessoaComponent } from './pesquisa-pessoa/pesquisa-pessoa.component';

import { TooltipModule} from 'primeng/tooltip';
import { TableModule } from 'primeng/table';  
import { InputMaskModule} from 'primeng/inputmask';
import { DropdownModule} from 'primeng/dropdown';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { InputTextModule} from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    CadastroPessoaComponent,
    PesquisaPessoaComponent],
  imports: [
    CommonModule,
    TooltipModule,
    TableModule,
    InputMaskModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  exports:[
    CadastroPessoaComponent,
    PesquisaPessoaComponent
  ]
})
export class PessoasModule { }
