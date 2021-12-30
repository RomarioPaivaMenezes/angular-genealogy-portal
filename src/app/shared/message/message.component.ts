import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
     <p-message *ngIf="hasError()" severity="error" text={{text}} ></p-message> 
  `,
  styles: [
  ]
})
export class MessageComponent {

  @Input() error: string = '';
  @Input() control: any ;
  @Input() text: string = '';

  hasError() : boolean{
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
