import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea-form',
  templateUrl: './textarea-form.component.html',
  styleUrls: ['./textarea-form.component.css']
})
export class TextareaFormComponent implements OnInit {
  reactiveForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      productId: new FormControl('',[Validators.required,Validators.min(100)]),
      productName: new FormControl('',[Validators.required,Validators.minLength(5)]),
      cost: new FormControl('',[Validators.required,Validators.min(500)]),
      quantity: new FormControl('',[Validators.required,Validators.min(5),Validators.max(20)]),
      billAmt: new FormControl({value: '',disabled:true}),
      discount: new FormControl({value: '',disabled:true}),
      netBillAmt: new FormControl({value: '',disabled:true})
    });
  }

  calculateVal(){
    this.reactiveForm.get('billAmt').setValue(this.reactiveForm.get('cost').value * this.reactiveForm.get('quantity').value);
    this.reactiveForm.get('billAmt').value > 10000 ? this.reactiveForm.get('discount').setValue((10/100 * this.reactiveForm.get('billAmt').value)) : this.reactiveForm.get('discount').setValue((5/100 * this.reactiveForm.get('billAmt').value));
    this.reactiveForm.get('netBillAmt').setValue(this.reactiveForm.get('billAmt').value - this.reactiveForm.get('discount').value);

  }
}
