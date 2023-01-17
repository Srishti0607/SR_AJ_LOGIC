import { Component, OnInit } from '@angular/core';
import { CapitalPipe } from '../pipes/custom.pipe';

@Component({
  selector: 'app-load-pipe',
  templateUrl: './load-pipe.component.html',
  styleUrls: ['./load-pipe.component.css']
})
export class LoadPipeComponent implements OnInit {
  randomNumb: any = []; //Store Random number
  userName: string = 'kameswara'
  public search:any = '';
  locked: any[] = [];
  query: any;
  newDigit: any;

  constructor(private capitalize:CapitalPipe) { }

  ngOnInit(): void {
    this.userName = this.capitalize.transform(this.userName);
    this.getRandomNumbers();
    this.locked = [
      {ID: 1, User: 'Agustin', AuthID: '68114', FormName: 'Fellman', WinHandle: 'Oak Way'},
      {ID: 2, User: 'Alden', AuthID: '98101', FormName: 'Raccoon Run', WinHandle: 'Newsome'},
      {ID: 3, User: 'Ramon', AuthID: '28586', FormName: 'Yorkshire Circle', WinHandle: 'Dennis'},
      {ID: 4, User: 'Elbert', AuthID: '91775', FormName: 'Lee', WinHandle: 'Middleville Road'},
  ]
  }

  getRandomNumbers(){
    for(var num = 0;num <10 ; num++){
      this.randomNumb.push(Math.random())
    }
  }

  addNewDigit(){
    console.log(this.newDigit);
    this.randomNumb.push(this.newDigit);
  }

}
