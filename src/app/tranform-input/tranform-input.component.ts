import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-tranform-input',
  templateUrl: './tranform-input.component.html',
  styleUrls: ['./tranform-input.component.css']
})
export class TranformInputComponent {
}

@Component({
  selector: 'app-tranform-input-child',
  template: `<div><span>Value changed after transformation for boolean - {{sampleInputParameter}}<br/></span>
  <span>Value changed after transformation for number - {{sampleNumberParameter}}</span><br/>
  <span>Value changed after transformation for number - {{numberParameterNotHandled}}</span><br/>
  <span>Value changed after transformation for number - {{conversionParam}}</span><br/>
  <span>Will it throw error {{title}}</span></div>`
  // styleUrls: ['']
})
export class TranformInputChildComponent {
  @Input({ transform: booleanAttribute }) sampleInputParameter;
  @Input({transform : numberAttribute}) numberParameterNotHandled ;
  @Input({ transform: (value: unknown) => numberAttribute(value, 42) }) sampleNumberParameter;
  @Input({transform: booleanAttribute}) conversionParam ;
  @Input({ required: false }) title: string = '';

}
