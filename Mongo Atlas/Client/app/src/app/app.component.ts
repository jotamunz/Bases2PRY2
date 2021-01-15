import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currencies : object[] = [
    {value: 1, name : 'Colones'},
    {value: 2, name : 'Dollars'}
  ]
}
