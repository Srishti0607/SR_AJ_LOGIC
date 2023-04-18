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
  monthYr: any;
  fromTime: any;
  endTime: any;
  editFlag: boolean = false;
  reminderId: any;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.subscriptionsList.push(
      this.landingSrv.getCalendarData().subscribe((data: any) => {
        this.reminderObj = data;
        this.setCalendar();
      },
        (err) => {
        })
    );

  }

  setCalendar() {
    this.currentDate = moment(); // get today's date (moment)
    this.selectedDate = moment(this.currentDate).format("DD/MM/YYYY"); // format current date
    this.currentMonth = moment(this.currentDate).format("MMMM"); // format current date and get month (Eg:-August)
    this.monthYr = moment(this.currentDate).format("MMMM-YYYY")
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
      if (newDate.format('MMMM') == this.currentDate?.format('MMMM')) {
        rem = this.reminderObj.findIndex((remData: any) => remData.id == newDate.format('MM') + newDate.format('DD') + newDate.format('YYYY'));
      }
      return {
        today: this.isToday(newDate), // boolean true/false
        selected: this.isSelected(newDate), //boolean true/false
        mDate: newDate,
        reminder: this.reminderObj[rem] ? this.reminderObj[rem].reminder : [],
        background: this.reminderObj[rem] ? true : false,       
        id: newDate.format('MM') + newDate.format('DD') + newDate.format('YYYY')
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
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.title = day.mDate.format('DD-MMM-YYYY');
  }

  closeModal() {
    this.reminderVal = '';
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  addReminder() {
    let payload;
    if (!this.editFlag) {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
      let obj = [];
      let dataToPush = {
        reminder: this.reminderVal,
        fromTime: this.fromTime,
        endTime: this.endTime,
        id:this.day['id']+this.fromTime
      }
      if(this.day['reminder'].length != 0){
        this.day['reminder'].push(dataToPush);      
        this.subscriptionsList.push(
          this.landingSrv.updateCalendarData(this.day).subscribe((data: any) => {         
            this.reminderVal = '';
            this.fromTime = '';
            this.endTime = '';
            this.editFlag = false;
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
          })
        );
      }else{
        obj.push(dataToPush)
        payload = {
          date: this.day.mDate,
          reminder: obj,
          id: this.day.mDate.format('MM') + this.day.mDate.format('DD') + this.day.mDate.format('YYYY')
        }
        this.subscriptionsList.push(
          this.landingSrv.postCalendarData(payload).subscribe((data: any) => {
            this.day.reminder.push(dataToPush);
            this.day.background = true;
            this.reminderVal = '';
            this.fromTime = '';
            this.endTime = '';
          })
        );
      }    
    } else {
      this.day['reminder'].forEach(det => { 
        if(det.id == this.reminderId){
          det.reminder = this.reminderVal;
          det.fromTime = this.fromTime;
          det.endTime = this.endTime;
        }   
      });
      this.subscriptionsList.push(
        this.landingSrv.updateCalendarData(this.day).subscribe((data: any) => {         
          this.reminderVal = '';
          this.fromTime = '';
          this.endTime = '';
          this.editFlag = false;         
          var modal = document.getElementById("myModal");
          modal.style.display = "none";
        })
      );
    }
  }

  editReminder(data) {
    this.reminderVal = data.reminder;
    this.fromTime = data.fromTime;
    this.endTime = data.endTime;
    this.editFlag = true;
    this.reminderId = data.id
  }

  deleteReminder(data) {
    if(this.day['reminder'].length > 1){
     let id = this.day['reminder'].findIndex((det: any) => det.id == data.id);
     this.day['reminder'].splice(id,1);    
     this.subscriptionsList.push(
      this.landingSrv.updateCalendarData(this.day).subscribe((data: any) => {         
        this.reminderVal = '';
        this.fromTime = '';
        this.endTime = '';
        this.editFlag = false;        
        var modal = document.getElementById("myModal");
        modal.style.display = "none";       
      })
    );
    }else if(this.day['reminder'].length == 1){     
      this.subscriptionsList.push(
        this.landingSrv.deleteCalendarData(this.day.id).subscribe((data: any) => {
          var modal = document.getElementById("myModal");
          modal.style.display = "none";
          this.day.reminder = '';
          this.reminderVal = '';
          this.day.background = false;
          console.log(this.day);
        })
      );
    }else{}
  }

  changeMonth(opr) {
    this.reminderObj = [];
    this.subscriptionsList.push(
      this.landingSrv.getCalendarData().subscribe((data: any) => {
        this.reminderObj = data;
        if (opr == 'N') {
          this.currentDate = moment(this.currentDate).add(1, 'months'); // get today's date (moment)    
          this.currentMonth = moment(this.currentDate).format("MMMM"); // format current date and get month (Eg:-August)
          this.monthYr = moment(this.currentDate).format("MMMM-YYYY")
          this.generateCalendarByFillingDates();
        } else {
          this.currentDate = moment(this.currentDate).subtract(1, 'months'); // get today's date (moment)      
          this.currentMonth = moment(this.currentDate).format("MMMM"); // format current date and get month (Eg:-August)
          this.monthYr = moment(this.currentDate).format("MMMM-YYYY")
          this.generateCalendarByFillingDates();
        }
      },
        (err) => {
        })
    );

  }



}


