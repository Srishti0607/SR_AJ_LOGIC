
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlphaSortPipe } from '../../../pipes/custom.pipe';
import { LandingService } from '../../landing.service';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.css']
})
export class ListBoxComponent implements OnInit {
  reactiveForm!: FormGroup;
  taxObj: any = [];
  isMultiple: boolean = true;
  finalObj: any = [];

  constructor(private landingSrv: LandingService,private alphaSorting:AlphaSortPipe) { }

  ngOnInit(): void {
    this.getTaxData();
    this.reactiveForm = new FormGroup({
      initialList: new FormControl([]),
      finalList: new FormControl([]),
      salary: new FormControl(0),
      allowance: new FormControl(0),
      netSal: new FormControl(0),
    });
    const elm = document.getElementById('grid');
    elm.style.gridTemplateColumns = `repeat( 3, 1fr)`;

  }

  getTaxData() {
    this.landingSrv.getTaxData().subscribe((data: any) => {
      if (data) {
        this.taxObj = this.alphaSorting.transform(data);
      }
    })
  }

  pushData(opr) {
    if (opr == 'R') {
      if (this.reactiveForm.get('initialList').value.length == 1) {
        let itemToPush = {
          "name": this.reactiveForm.get('initialList').value[0].split('-')[1],
          "val": this.reactiveForm.get('initialList').value[0].split('-')[0]
        }
        this.finalObj.push(itemToPush);
        this.finalObj = this.alphaSorting.transform(this.finalObj);
        this.taxObj.splice(this.reactiveForm.get('initialList').value[0].split('-')[2], 1);
        this.reactiveForm.get('initialList').setValue([]);
      } else {
        this.reactiveForm.get('initialList').value.forEach(data => {
          let index = this.taxObj.findIndex((data1, index) => parseInt(data1.val) === parseInt(data.split('-')[0]));
          this.taxObj.splice(index, 1)
          let itemToPush = {
            "name": data.split('-')[1],
            "val": data.split('-')[0]
          }
          this.finalObj.push(itemToPush);
          this.finalObj = this.alphaSorting.transform(this.finalObj);
        });
        this.reactiveForm.get('initialList').setValue([]);
      }
    } else {

      if (this.reactiveForm.get('finalList').value.length == 1) {
        this.finalObj.splice(this.reactiveForm.get('finalList').value[0].split('-')[2], 1);
        let itemToPush = {
          "name": this.reactiveForm.get('finalList').value[0].split('-')[1],
          "val": this.reactiveForm.get('finalList').value[0].split('-')[0]
        }
        this.taxObj.push(itemToPush);
        this.taxObj = this.alphaSorting.transform(this.taxObj);
        this.reactiveForm.get('finalList').setValue([]);
        this.finalObj.length == 0 ? (this.reactiveForm.get('allowance').setValue(0),this.reactiveForm.get('netSal').setValue(0)) : '';
      } else {
        this.reactiveForm.get('finalList').value.forEach(data => {
          let index = this.finalObj.findIndex((data1, index) => parseInt(data1.val) === parseInt(data.split('-')[0]));
          this.finalObj.splice(index, 1)
          let itemToPush = {
            "name": data.split('-')[1],
            "val": data.split('-')[0]
          }
          this.taxObj.push(itemToPush);
          this.taxObj = this.alphaSorting.transform(this.taxObj);
        });
        this.reactiveForm.get('finalList').setValue([]);
        this.finalObj.length == 0 ? (this.reactiveForm.get('allowance').setValue(0),this.reactiveForm.get('netSal').setValue(0)) : '';
      }
    }
  }

  calculateNetSal() {
    let totalTax = 0
    this.finalObj.forEach(data => {
      totalTax = totalTax + parseFloat(data.val);      
    });
    this.reactiveForm.get('allowance').setValue(parseFloat((this.reactiveForm.get('salary').value * (totalTax / 100)).toFixed(2)));
      this.reactiveForm.get('netSal').setValue(parseFloat(this.reactiveForm.get('salary').value + this.reactiveForm.get('allowance').value));

  }

}
