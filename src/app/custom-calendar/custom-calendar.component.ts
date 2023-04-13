import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from "moment";
import { LandingService } from '../services/landing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  public currentDate: moment.Moment; //getToday Date
  public namesOfDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; //for viewing name of days
  public weeks = []; // store array of attendance details with calendar data
  public selectedDate; //formatted current date
  currentMonth: any; // store current month
  gridViewAttArray: any = [];
  editMode = false;
  title: any;
  day: any = [];
  reminderVal: any = '';
  reminderObj: any = [];

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.subscriptionsList.push(
      this.landingSrv.getCalendarData().subscribe((data: any) => {
        this.reminderObj = data; 
        this.setCalendar();     
      },
      (err)=> {       
      })
    );     
   
  }

  setCalendar() {
    this.currentDate = moment(); // get today's date (moment)
    this.selectedDate = moment(this.currentDate).format("DD/MM/YYYY"); // format current date
    this.currentMonth = moment(this.currentDate).format("MMMM"); // format current date and get month (Eg:-August)
    this.generateCalendarByFillingDates();

  }

  generateCalendarByFillingDates() {
    this.weeks = []; this.gridViewAttArray = [];
    const dates = this.fillDates(this.currentDate); // fill data acc to current date.

    const weeks = [];
    while (dates.length > 0) {
      this.gridViewAttArray.push(dates.splice(0, 7)); // store data like 7 days at a time for first row
    }
    this.weeks = this.gridViewAttArray;
    //pass data weekly (7 days) at a time
  }

  fillDates(currentMoment: moment.Moment) {
   
    const firstOfMonth = moment(currentMoment).startOf("month").day(); //week's day on 1st of month
    const lastOfMonth = moment(currentMoment).endOf("month").day(); //week's day on last of month
    const firstDayOfGrid = moment(currentMoment)
      .startOf("month")
      .subtract(firstOfMonth, "days"); //first date of calendar grid
    const lastDayOfGrid = moment(currentMoment)
      .endOf("month")
      .subtract(lastOfMonth, "days")
      .add(7, "days"); //last date of calendar grid
    const startCalendar = firstDayOfGrid.date(); //dynamically create calendar grid from first date of calendar

    return this.range(
      startCalendar,
      startCalendar + lastDayOfGrid.diff(firstDayOfGrid, "days")
    ).map((date) => {
      let rem;
      const newDate = moment(firstDayOfGrid).date(date);
      if(newDate.format('MMMM') == this.currentDate?.format('MMMM')){
        rem = this.reminderObj.findIndex((remData: any) =>  remData.id == newDate.format('MM')+newDate.format('DD'));
      }
      return {        
        today: this.isToday(newDate), // boolean true/false
        selected: this.isSelected(newDate), //boolean true/false
        mDate: newDate,
        reminder: this.reminderObj[rem]?.reminder
      };
    });
  }

  range(start, end) {
    var arr = [];
    for (var i = start; i < end; i++) {
      arr.push(i);
    }
    return arr;
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), "day");
  }

  isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format("DD/MM/YYYY");
  }

  selectDate(day) {   
    this.day = day;
    day.reminder != '' ? this.reminderVal = day.reminder : this.reminderVal = '';
    console.log(this.reminderVal);
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.title = day.mDate.format('MM/DD/YYYY');    
  }

  closeModal() {
    this.reminderVal = '';
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  addReminder() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    let payload = {
      date: this.day.mDate,
      reminder: this.reminderVal,
      id: this.day.mDate.format('MM')+this.day.mDate.format('DD')
    }
    this.subscriptionsList.push(
      this.landingSrv.postCalendarData(payload).subscribe((data: any) => {
        this.day.reminder = this.reminderVal;
        this.reminderVal = '';
      })
    );
  }

  editReminder(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    let payload = {
      date: this.day.mDate,
      reminder: this.reminderVal,
      id: this.day.mDate.format('MM')+this.day.mDate.format('DD')
    }
    this.subscriptionsList.push(
      this.landingSrv.updateCalendarData(payload).subscribe((data: any) => {
        this.day.reminder = this.reminderVal;
        this.reminderVal = '';
      })
    );
  }

  deleteReminder(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    let payload = {
      date: this.day.mDate,
      reminder: this.reminderVal,
      id: this.day.mDate.format('MM')+this.day.mDate.format('DD')
    }
    this.subscriptionsList.push(
      this.landingSrv.deleteCalendarData(payload).subscribe((data: any) => {
        this.day.reminder = '';
        this.reminderVal = '';
      })
    );
  }

  changeMonth(opr){
    this.reminderObj = [];
    this.subscriptionsList.push(
      this.landingSrv.getCalendarData().subscribe((data: any) => {
        this.reminderObj = data; 
        if(opr == 'N'){
          this.currentDate = moment(this.currentDate).add(1,'months'); // get today's date (moment)    
          this.currentMonth = moment(this.currentDate).format("MMMM"); // format current date and get month (Eg:-August)
          this.generateCalendarByFillingDates();
        }else{
          this.currentDate = moment(this.currentDate).subtract(1,'months'); // get today's date (moment)      
          this.currentMonth = moment(this.currentDate).format("MMMM"); // format current date and get month (Eg:-August)
          this.generateCalendarByFillingDates();
        }
      },
      (err)=> {       
      })
    );    

  }



}


