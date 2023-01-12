import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title = 'sample-application';

  constructor() {
    console.log('setting apm obj');
  }

  tiles: any = [
    { text: 'One', cols: 1, rows: 2, color: 'lightblue' },
    { text: 'Two', cols: 3, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
}
