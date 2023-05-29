import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='ng-crud';
  constructor(){
    localStorage.setItem('contN1', '0');
    localStorage.setItem('contN2', '0');
    localStorage.setItem('contN3', '0');
  }
}
