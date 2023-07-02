import { Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-destroy-feature',
  templateUrl: './destroy-feature.component.html',
  styleUrls: ['./destroy-feature.component.css']
})

export class DestroyFeatureComponent implements OnDestroy {
  private untilDestroy = untilDestroyed();

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      console.log('This message will be seen from destroyRef when component is destroyed');
    })
  }

  ngOnInit() {
    interval(1000)
      .pipe(this.untilDestroy())
      .subscribe(console.log);
  }

  untilDestroyed() {
    const subject = new Subject();

    inject(DestroyRef).onDestroy(() => {
      subject.next(true);
      subject.complete();
    });

    return<T>()=> subject.asObservable();
  }

  ngOnDestroy() {
    console.log('This message will be seen from destroy life cycle hook when component is destroyed');
  }
}

export function untilDestroyed() {
  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    subject.next(true);
    subject.complete();
  });

  return <T>() => takeUntil<T>(subject.asObservable());
}
