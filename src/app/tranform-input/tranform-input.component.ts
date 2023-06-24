import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tranform-input',
  templateUrl: './tranform-input.component.html',
  styleUrls: ['./tranform-input.component.css']
})
export class TranformInputComponent {

}

@Component({
  selector: 'app-tranform-input-child',
  template: `<div></div>`
  // styleUrls: ['']
})
export class TranformInputChildComponent {
  // @Input({ transform: booleanAttribute }) sampleInputParameter = false;

}
