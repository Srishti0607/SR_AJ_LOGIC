import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  private currencyDetBaseURL: string = 'https://api.exchangerate.host'
  private baseUrl: string = Config.baseURL;
  private employeeURL: string = this.baseUrl + 'Employees';

  constructor(private http: HttpClient) { }

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
  getCurrencyData(sourceCurr: string) {
    return this.http.get(this.currencyDetBaseURL + '/latest?base=' + sourceCurr);
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
    let url = "assets/EMP_DET.json"
    return this.http.get(url);
  }

  getDataToDeleteCheck() {
    let url = "assets/EMP_DET_CHECKED.json"
    return this.http.get(url);
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
}
