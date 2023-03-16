import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {
  public currentDate: moment.Moment; //getToday Date
  public namesOfDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; //for viewing name of days
  public weeks= []; // store array of attendance details with calendar data
  public selectedDate; //formatted current date
  currentMonth: any; // store current month
  gridViewAttArray: any = [];

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.setCalendar();
  }

  setCalendar(){
  this.currentDate = moment(); // get today's date (moment)
  this.selectedDate = moment(this.currentDate).format("DD/MM/YYYY"); // format current date
  this.currentMonth = moment(this.currentDate).format("MMMM"); // format current date and get month (Eg:-August)
  this.generateCalendarByFillingDates();
  
  }

  generateCalendarByFillingDates() {
    this.weeks = [];this.gridViewAttArray = [];
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
      const newDate = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(newDate), // boolean true/false
          selected: this.isSelected(newDate), //boolean true/false
          mDate: newDate,
          reminder: ''
        };
    });
  }

  range(start, end) {
    var arr = [];
    for (var i = start; i < end; i++) {
        arr.push(i);
    }
    // console.log(foo)
    return arr;
}

isToday(date: moment.Moment): boolean {
  return moment().isSame(moment(date), "day");
}

isSelected(date: moment.Moment): boolean {
  return this.selectedDate === moment(date).format("DD/MM/YYYY");
}

selectDate(day){
  let reminderText = '';
  let reminder = prompt("Please enter your Reminder:", "");
  if (reminder == null || reminder == "") {
    reminderText = "";
  } else {
    reminderText = reminder;
    day.reminder = reminderText;
  }
}

}


