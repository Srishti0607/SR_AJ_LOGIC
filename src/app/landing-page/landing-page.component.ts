import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  countryDetObj: any = []; //store country details getting from service
  currencyCode: string = ''; //Displays surrency code wrt the country selected
  upperLetterObj: any = []; //Store upper alphabets
  lowerLetterObj: any = []; //Store upper alphabets
  numberObj: any = []; //Store upper alphabets
  inputData: string = '';//Capture string to delete
  inputDataForInsertion: string = '';//Capture string to insert
  selectDataForInsertion: string = '';//Capture string to select
  position: string = '';//Capture position
  upperAlpha: any;//select upper alphabet
  initialData: string = '';//store initial data to update
  finalData: string;//store final data to update
  amount:any;//store amount value
  fromCurr: string;// store from currency selected
  toCurr: string;// store to currency selected
  CurrencyObj: any = ['INR','USD','GBP','AUD','CAD']; //stores currency
  conversionResult: any ;// stores converted result of currency
  conversionFlag:boolean = false; //show/hide spinner
  baseAmt: any ; //store base amount

  constructor(private landingSrv: LandingService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
  initializeList(){
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
      if (this.position) {
        this.upperLetterObj.splice(this.position, 0, this.inputDataForInsertion);
        this.inputDataForInsertion = '';
        this.position = '';
      } else {
        this.upperLetterObj.push(this.inputDataForInsertion);
        this.inputDataForInsertion = '';
      }
  }

  //Update/Select/Delete Operation
  applyOperation(opr: string) {
    let index = this.upperLetterObj.findIndex((data, index) => data === (opr == 'U' ? this.initialData : opr == 'S' ? this.selectDataForInsertion : opr == 'D' ? this.inputData : ''));
    if (opr == 'U') {
      index != -1 ? (
        this.upperLetterObj.splice(index, 1),
        this.upperLetterObj.splice(index, 0, this.finalData),
        this.openSnackBar('Item Updated Successfully!!')
      ) : (this.openSnackBar('Item Does Not Exist!!'),
        this.initialData = '',
        this.finalData = ''
      )
    } else if (opr == 'S') {
      index != -1 ? (
        this.upperAlpha = this.selectDataForInsertion,
        this.selectDataForInsertion = '',
        this.openSnackBar('Item Selected Successfully!!')
      ) : (this.selectDataForInsertion = '',
        this.openSnackBar('Item Does Not Exist!!')
      )
    } else {
      index != -1 ? (
        this.upperLetterObj.splice(index, 1),
        this.inputData = '',
        this.openSnackBar('Data Deleted Successfully!!')
      ) : (this.inputData = '',
        this.openSnackBar('Item Does Not Exist!!')
      )
    }
  }

  //Convert currency
  convertCurrency(){
    this.conversionFlag = true
    this.subscriptionsList.push(
      this.landingSrv.getCurrencyData(this.fromCurr).subscribe((data: any) => {
        if (data) {
          this.conversionFlag = false;
          this.baseAmt = data.rates[this.toCurr];
        this.conversionResult = this.amount *  data.rates[this.toCurr];          
        }
      })
    );
  }
}
