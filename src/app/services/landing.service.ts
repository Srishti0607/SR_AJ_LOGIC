import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LandingService {
    private currencyDetBaseURL:string = 'https://api.exchangerate.host'

  constructor(private http:HttpClient) { }

  //Call to datasource for getting list of Country names with currency codes
  getCountryDetails() {
    let url = "assets/CountryDet.json"
      return this.http.get(url);
  }

  //Get users
  getUsers() {
    let url = "assets/USERS.json"
      return this.http.get(url);
  }

  //Get Order details from JSON
  getOrderData() {
    let url = "assets/Orders_Details.json"
      return this.http.get(url);
  }

  //Get currency conversion rate
  getCurrencyData(sourceCurr:string){
      return this.http.get(this.currencyDetBaseURL+'/latest?base='+sourceCurr);
  }

  //get Order List
  getOrderList(){
    let url = "assets/Orders.json"
      return this.http.get(url);
  }

  //get grand totals
  getTotalData(){
    let url = "assets/SubTotals.json"
      return this.http.get(url);
  }

   //get employee data
   getEmployeeData(){
    let url = "assets/Employees.json"
      return this.http.get(url);
  }

    //get data to delete
    getDataToDelete(){
      let url = "assets/EMP_DET.json"
        return this.http.get(url);
    }

    getDataToDeleteCheck(){
      let url = "assets/EMP_DET_CHECKED.json"
        return this.http.get(url);
    }

    //bulk Insert
    bulkInsertData(payload){
      let url = "https://fakestoreapi.com/users"
        return this.http.post(url,payload);
    }

}
