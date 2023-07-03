import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from '../config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  private currencyDetBaseURL: string = 'https://api.exchangerate.host'
  public baseUrl: string = Config.baseURL;
  #currencyDetBaseURLDefined: string = 'https://api.exchangerate.host'
  private employeeURL: string = this.baseUrl + 'Employees';
  public captureBeh = new BehaviorSubject<any>('');
  parameterizedCalled: boolean = false;
  captureSignal = signal('');
  setCompany(data: any) {
    this.captureBeh.next(data);
  }

  constructor(private http: HttpClient) {
   }

  //Call to datasource for getting list of Country names with currency codes
  getCountryDetails() {
    let url = "assets/CountryDet.json"
    return this.http.get(url);
  }

    //Call to datasource for getting list of Country names with currency codes
    getCountryStateCityDetails() {
      let url = "assets/country-state-city.json"
      return this.http.get(url);
    }

  //Get users
  getUsers() {
    let url = "assets/USERS.json"
    return this.http.get(url);
  }

   //Get users
   getEmp() {
    let url = "assets/EMP.json"
    return this.http.get(url);
  }

  //Get Order details from JSON
  getOrderData() {
    let url = "assets/Orders_Details.json"
    return this.http.get(url);
  }

   //Get New Order details from JSON
   getNewOrderData() {
    let url = "assets/accordian-order.json"
    return this.http.get(url);
  }

  //Get currency conversion rate
  getCurrencyData(sourceCurr: string) {
    return this.http.get(this.currencyDetBaseURL + '/latest?base=' + sourceCurr);
  }

  //get rates
  getRates() {
    let url = "assets/Rates.json"
    return this.http.get(url);
  }

  //get Order List
  getOrderList() {
    let url = "assets/Orders.json"
    return this.http.get(url);
  }

  //get grand totals
  getTotalData() {
    let url = "assets/SubTotals.json"
    return this.http.get(url);
  }

  //get employee data
  getEmployeeData() {
    let url = "assets/Employees.json"
    return this.http.get(url);
  }

  //get data to delete
  getDataToDelete() {
    let url = "http://localhost:3000/radioData"
    return this.http.get(url);
  }

  deleteRadioData(id){
    return this.http.delete('http://localhost:3000/radioData/'+id)
  }

  getDataToDeleteCheck() {
    let url = "http://localhost:3000/checkedData"
    return this.http.get(url);
  }

  deleteCheckData(id){
    return this.http.delete('http://localhost:3000/checkedData/'+id)
  }

  //bulk Insert
  bulkInsertData(payload) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    let url = "http://localhost:3000/bulkInsert"
    return this.http.post(url, payload,{headers});
  }

  bulkUpdateData(payload) {
    let url = "http://localhost:3000/bulkInsert/"+payload.id;
    return this.http.put(url, payload);
  }

  bulkDeleteData(payload) {
    console.log(payload)
    let url = "https://apidemo20230129132543.azurewebsites.net/api/customer"
    // let url = "https://fakestoreapi.com/users"
    return this.http.delete(url, payload);
  }

  //get Data
  getDataToUpdate() {
    let url = "http://localhost:3000/bulkInsert"
    return this.http.get(url);
  }

  //get Data for Employee
  getEmpData() {
    // return this.http.get(this.employeeURL);
    return this.http.get('http://localhost:3000/employee')
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-type', 'appplication/json'); 
  }

  updateEmpData(payload,id){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
   
    // return this.http.put(this.employeeURL,payload);
    return this.http.put('http://localhost:3000/employee/'+id,payload,{
      headers
    })
  }

  deleteEmpData(id){
    // return this.http.delete(this.employeeURL,payload);
    return this.http.delete('http://localhost:3000/employee/'+id)
  }

  insertEmpData(payload){
    // return this.http.delete(this.employeeURL,payload);
    return this.http.post('http://localhost:3000/employee',payload)
  }

  getTaxData(){
    return this.http.get('http://localhost:3000/taxes')
  }

  getCountryData(page,limit){
    return this.http.get('http://localhost:3000/country?_page='+page+'&_limit='+limit);
  }

    //Call to datasource for getting list of chart details
    getChartDetails() {
      let url = "assets/Graph.json"
      return this.http.get(url);
    }

    getbehData(){
      let url = "https://fakestoreapi.com/products/categories";
      return this.http.get(url);
    }

    getbehCategoryData(category){
      let url = "https://fakestoreapi.com/products/category/"+category;
      return this.http.get(url);
    }

    postCalendarData(payload){
      const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    let url = "http://localhost:3000/calendar"
    return this.http.post(url,payload,{headers});
    }

    updateCalendarData(payload){     
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      let url = "http://localhost:3000/calendar/"+payload.id;
      return this.http.put(url,payload,{headers});
    }

    deleteCalendarData(payload){     
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      let url = "http://localhost:3000/calendar/"+payload;
      return this.http.delete(url);
    }

    getCalendarData(){     
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      let url = "http://localhost:3000/calendar";
      return this.http.get(url);
    }
}
