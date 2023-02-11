import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';

@Component({
  selector: 'app-cookie-handler',
  templateUrl: './cookie-handler.component.html',
  styleUrls: ['./cookie-handler.component.css']
})
export class CookieHandlerComponent implements OnInit {
  userName: string = '';
  getAllCookies: any = [];

  constructor(public cookieService: CookieService) {
    this.cookieService.set('Name', Config.userName);
    this.cookieService.set('Age', '30');
    this.cookieService.set('Place', 'Hyderabad');
    this.userName = this.cookieService.get('Name');
  }

  ngOnInit(): void {
    this.getAllCookies = JSON.stringify(this.cookieService.getAll())
  }

  deleteCookie(){
    this.cookieService.delete('Age'); 
    this.getAllCookies = JSON.stringify(this.cookieService.getAll());
  }

  deleteAllCookie(){
    this.cookieService.deleteAll();
    this.getAllCookies = JSON.stringify(this.cookieService.getAll());
  }

  resetCookie(){
    this.cookieService.set('Name', Config.userName);
    this.cookieService.set('Age', '30');
    this.cookieService.set('Place', 'Hyderabad');
    this.getAllCookies = JSON.stringify(this.cookieService.getAll());
  }

  addWeightCookie(){
    this.cookieService.set('weight', '60');
    this.getAllCookies = JSON.stringify(this.cookieService.getAll());
  }

}
