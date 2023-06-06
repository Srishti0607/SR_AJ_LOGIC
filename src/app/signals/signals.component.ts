import { Component,OnInit,computed,effect,signal } from '@angular/core';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  valueFrom: number = 1;
  valueTo: number = 2;
  valueTotal: number;
  signalFrom = signal(1);
  signalTo = signal(2);
  signalTotal: any;
  readonly name = signal('World');
  readonly message = computed(() => {
    return `Hello ${this.name()}!`;
  });
  count = signal(10);
  bookDet = signal([{name: 'Learn Signals', price: 100},{name: 'Learn Angular', price: 200},{name: 'Learn NodeJS', price: 300}]);
  eventObj: any = [];
  loggingEffectForCount = effect(() => {
    console.log(`The count is: ${this.count()}`);
    this.eventObj.push(this.count())
  });
  counter = signal(0);
  counter$: any = toObservable(this.counter);
  readonly numberVal = signal(1000);

  constructor(){}

  ngOnInit(){
    this.valueTotal = this.valueFrom + this.valueTo;
    this.signalTotal = computed(()=>this.signalFrom()+this.signalTo());
    this.counter$.subscribe(value => {
      console.log(value)
    });
    this.counter.set(1);
  }

  computeAgain(){
    this.valueFrom = 3;
  }

  computeSignalAgain(){
    this.signalFrom.set(3);
  }

  updateCount(){
    this.count.update(count=>count*100)
  }

  objMutate(){
    this.bookDet().forEach((value:any,index:any) => {
      this.bookDet.mutate(data => {
        data[index].price = value.price + 50;
      });
    });
   
  }

  compute(){
   return computed(() => this.numberVal() % 2 === 0) ? 'Even' : 'Odd'
  }

}

function value(value: { name: string; price: number; }, index: number, array: { name: string; price: number; }[]): void {
  throw new Error('Function not implemented.');
}

