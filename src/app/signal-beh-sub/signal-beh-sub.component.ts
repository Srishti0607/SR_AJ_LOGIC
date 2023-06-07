import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-signal-beh-sub',
  templateUrl: './signal-beh-sub.component.html',
  styleUrls: ['./signal-beh-sub.component.css']
})
export class SignalBehSubComponent {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  behObj: any = [];
  reactiveForm!: FormGroup;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      behData: new FormControl()
    });
    this.behSub();
  }

  behSub() {
    this.subscriptionsList.push(
      this.landingSrv.getbehData().subscribe((data: any) => {
        if (data) {
          this.behObj = data;
        }
      })
    );
  }

  updateInputs(){    
    console.log('Hi',this.reactiveForm.get('behData').value) 
    this.landingSrv.captureSignal.set(this.reactiveForm.get('behData').value);
  }

}
