import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-promise-observable',
  templateUrl: './promise-observable.component.html',
  styleUrls: ['./promise-observable.component.css']
})
export class PromiseObservableComponent implements OnInit {
  promise: Promise<string>;
  promiseContent: string = "";
  observable: Observable<string>;
  observableContent: string = "";
  observableOpr: Observable<string>;
  observableContentOpr: string = "";

  constructor() { 
    this.promises();
    this.observables();
    this.observableOperator();
  }

  ngOnInit(): void {
  }

  promises() {
    // Promise with multiple value resolves
    this.promise = new Promise((resolve, reject) => {
      this.promiseContent +=
        "1. Promise created and now you are inside the Promise. <br/>";

      // 1st resolve
      resolve("2. This is the first message by the Promise.");

      //second resolve - This will never display
      resolve("3. This is the second message by the Promise.");
    });

    // 'Then' will be registered and queued but the callback will be executed later asynchronously
    this.promise.then(res => {
      this.promiseContent += res + " <br/>";
      this.promiseContent += `4. Inside 'then', Successfully retrieved 
      messages from the Promise. <br/>`;
    });
  }

  observables() {
    // Once subcrption triggered only observer call back function will be executed
    this.observable = new Observable(observer => {
      this.observableContent += "1. Inside obervable <br/>";

      // 1st emit
      observer.next("2. This is the 1st message by the Observable.<br/>");

      //2nd emit
      observer.next("3. This is the 2nd message by the Observable.<br/>");
      
      observer.complete();
    });

    const subscription = this.observable.subscribe({
      next: value => {
        this.observableContent += value;
        this.observableContent +=
          "4. Inside 'subscription', Successfully retrieved messages from the Observable. <br/></br>";
      },
      complete: () => {
        this.observableContent += "5. Done with the subscription <br/>";
      }
    });

    subscription.unsubscribe();
  }

  observableOperator(){
      // Operators are useful in transforming streams
      this.observableOpr = interval(1000).pipe(
        take(5),
        map(v => new Date(Date.now()).toISOString())
      );
  
      // Once subscription triggered it will retrun here
      const subscription = this.observableOpr.subscribe(value => {
        this.observableContentOpr += value + "</br>";
      });
    }

  }
