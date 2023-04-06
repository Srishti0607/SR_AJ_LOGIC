import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { ConvertPipe } from '../pipes/custom.pipe';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  countryDetObj: any = []; //store country details getting from service
  upperLetterObj: any = []; //Store upper alphabets
  lowerLetterObj: any = []; //Store upper alphabets
  numberObj: any = []; //Store upper alphabets
  CurrencyObj: any = ['INR', 'USD', 'GBP', 'AUD', 'CAD']; //stores currency
  conversionResult: any;// stores converted result of currency
  currencyVal:any;
  conversionFlag: boolean = false; //show/hide spinner
  baseAmt: any; //store base amount
  baseAmt1: any;
  reactiveForm!: FormGroup;
  filterMetadata = { count: 0,value:0 };

  constructor(private landingSrv: LandingService, private snackBar: MatSnackBar, private converterpipe: ConvertPipe) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      currencyCode: new FormControl([]),
      upperAlpha: new FormControl('A'),
      inputData: new FormControl(''),
      inputDataForInsertion: new FormControl(''),
      position: new FormControl(''),
      selectDataForInsertion: new FormControl(''),
      initialData: new FormControl(''),
      finalData: new FormControl(''),
      amount: new FormControl(''),
      fromCurr: new FormControl(),
      toCurr: new FormControl(),
      code: new FormControl(),
      population: new FormControl(),
      capital: new FormControl(),
      amount1: new FormControl(''),
      fromCurr1: new FormControl(),
      toCurr1: new FormControl(),
      currConverted: new FormControl()
    });
    this.getCountryCodesData();
    this.initializeList();
  }

  //Get country list with currency codes
  getCountryCodesData() {
    this.subscriptionsList.push(
      this.landingSrv.getCountryDetails().subscribe((data: any) => {
        if (data) {
          this.countryDetObj = data['countries']['country'];
        }
      })
    );
  }

  //Initialize list
  initializeList() {
    this.getUpperAlphabetList();
    this.getLowerAlphabetList();
    this.getNumbersList();
  }

  //Get Upper case alphabet list
  getUpperAlphabetList() {
    let alpha = Array.from(Array(26)).map((e, i) => i + 65);
    this.upperLetterObj = alpha.map((x) => String.fromCharCode(x));
  }

  //Get Lower case alphabet list
  getLowerAlphabetList() {
    let alpha = Array.from(Array(26)).map((e, i) => i + 97);
    this.lowerLetterObj = alpha.map((x) => String.fromCharCode(x));
  }

  //Get number alphabet list
  getNumbersList() {
    let alpha = Array.from(Array(10)).map((e, i) => i + 48);
    this.numberObj = alpha.map((x) => String.fromCharCode(x));
  }

  //Clear functionality
  clearDetails() {
    this.upperLetterObj = [];
    this.lowerLetterObj = [];
    this.numberObj = [];
  }

  //Open snackbar
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

  //Insertion Operation
  insertItemInUpperList() {
    if (this.reactiveForm.get('position').value) {
      this.upperLetterObj.splice(this.reactiveForm.get('position').value, 0, this.reactiveForm.get('inputDataForInsertion').value);
      this.reactiveForm.get('inputDataForInsertion').setValue('');
      this.reactiveForm.get('position').setValue('');
    } else {
      this.upperLetterObj.push(this.reactiveForm.get('inputDataForInsertion').value);
      this.reactiveForm.get('inputDataForInsertion').setValue('');
    }
  }

  //Update/Select/Delete Operation
  applyOperation(opr: string) {
    let index = this.upperLetterObj.findIndex((data, index) => data === (opr == 'U' ? this.reactiveForm.get('initialData').value : opr == 'S' ? this.reactiveForm.get('selectDataForInsertion').value : opr == 'D' ? this.reactiveForm.get('inputData').value : ''));
    if (opr == 'U') {
      index != -1 ? (
        this.upperLetterObj.splice(index, 1),
        this.upperLetterObj.splice(index, 0, this.reactiveForm.get('finalData').value),
        this.openSnackBar('Item Updated Successfully!!')
      ) : (this.openSnackBar('Item Does Not Exist!!'),
        this.reactiveForm.get('initialData').setValue(''),
        this.reactiveForm.get('finalData').setValue('')
      )
    } else if (opr == 'S') {
      index != -1 ? (
        this.reactiveForm.get('upperAlpha').setValue(this.reactiveForm.get('selectDataForInsertion').value),
        this.reactiveForm.get('selectDataForInsertion').setValue(''),
        this.openSnackBar('Item Selected Successfully!!')
      ) : (this.reactiveForm.get('selectDataForInsertion').setValue(''),
        this.openSnackBar('Item Does Not Exist!!')
      )
    } else {
      index != -1 ? (
        this.upperLetterObj.splice(index, 1),
        this.reactiveForm.get('inputData').setValue(''),
        this.openSnackBar('Data Deleted Successfully!!')
      ) : (this.reactiveForm.get('inputData').setValue(''),
        this.openSnackBar('Item Does Not Exist!!')
      )
    }
  }

  //Convert currency
  convertCurrency() {
    this.conversionFlag = true
    this.subscriptionsList.push(
      this.landingSrv.getCurrencyData(this.reactiveForm.get('fromCurr').value).subscribe((data: any) => {
        if (data) {
          this.conversionFlag = false;
          this.baseAmt = data.rates[this.reactiveForm.get('toCurr').value];
          this.conversionResult = this.reactiveForm.get('amount').value * data.rates[this.reactiveForm.get('toCurr').value];
        }
      })
    );
  }

  updateInputs(){
    let det = this.reactiveForm.get('currencyCode').value;
    this.reactiveForm.get('code').setValue(det.currencyCode);
    this.reactiveForm.get('population').setValue(det.population);
    this.reactiveForm.get('capital').setValue(det.capital);    
  }

  canDeactivate(){
    return this.reactiveForm.get('currencyCode').value.length > 0
  }

  setInput(){
    // this.amt = this.reactiveForm.get('amount1').value;
  }

  checkUpdatedValue(eve){
    console.log(eve);
  }
}
