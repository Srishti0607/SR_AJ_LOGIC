import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';
import { StandaloneComponentComponent } from '../standalone-component/standalone-component.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chartOpt : any = [
    {name:'Line Chart',id:1},
    {name:'Bar Chart',id:2},
    {name:'Pie Chart',id:3},
    {name:'Donut Chart',id:4},
    {name:'Bubble Chart',id:5},
    {name:'Area Chart',id:6},
    {name:'Radar Chart',id:7},
    {name:'Polar Chart',id:8},
    {name:'Scatter Plot',id:9}
  ]
  reactiveForm!: FormGroup;
  chart: any;
  chartObj: any = [];
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  labelData: any = [];
  countData: any = [];
  countDataArray: any;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getData();
    this.reactiveForm = new FormGroup({
      chartSelected: new FormControl(),
    });
  }

  getData(){
    this.subscriptionsList.push(
      this.landingSrv.getChartDetails().subscribe((data: any) => {
        if (data) {
          this.chartObj = data;
        }
      })
    );
  }

  updateGraphs(){
    let id = this.reactiveForm.get('chartSelected').value;
    if(id==1){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);
        this.countData.push(chartDet.totalEmployee);       
      }); 
      this.createChart('line');
    } else if(id==2){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);
        this.countData.push(chartDet.totalEmployee);       
      });
      this.createChart('bar');
    } else if(id==3){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);
        this.countData.push(chartDet.totalEmployee);       
      });
      this.createChart('pie');
    } else if(id==4){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);
        this.countData.push(chartDet.totalEmployee);       
      });     
      this.createChart('doughnut');
    } else if(id == 5){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);
        let dataToPush = {
          x: chartDet.totalEmployee,
          y: chartDet.rejectedEmployee,
          r: 8
        }
        this.countData.push(dataToPush);       
      });     
      this.createChart('bubble');
    } else if(id == 6){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);  
        let obj = [];
        obj.push(chartDet.totalEmployee);
        obj.push(chartDet.rejectedEmployee);
        obj.push(chartDet.onHold);
        obj.push(chartDet.onLeave);
        obj.push(chartDet.technical);
        obj.push(chartDet.nonTech)
        let dataToPush =  {
          label: chartDet.month,
          data: obj,
          backgroundColor: 'rgba(40,125,200,.5)',
          borderColor: 'rgb(40,100,200)',
          fill: true,
          lineTension: 0,
          radius: 5,
        }
        this.countData.push(dataToPush)
      });   
      this.createChart('area');
    }else if(id==7){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);  
        let obj = [];
        obj.push(chartDet.totalEmployee);
        obj.push(chartDet.rejectedEmployee);
        obj.push(chartDet.onHold);
        obj.push(chartDet.onLeave);
        obj.push(chartDet.technical);
        obj.push(chartDet.nonTech);       
        let dataToPush =   {
          label: chartDet.month,
          data: obj,
          backgroundColor: 'rgba(166,214,249,0.3)',
          borderColor: 'rgb(166,214,249)',
          pointBackgroundColor: '#fff'
        }
        this.countData.push(dataToPush)
      });
      this.createChart('radar');
    } else if(id==8){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);  
        this.countData.push(chartDet.totalEmployee);
      });
      this.createChart('polarArea');
    }else if(id==9){
      this.chart?.destroy();
      this.labelData = [];
      this.countData = [];
      this.chartObj.forEach((chartDet: any) => {
        this.labelData.push(chartDet.month);
        let dataToPush = {
          x: chartDet.totalEmployee,
          y: chartDet.rejectedEmployee
        }
        this.countData.push(dataToPush);       
      });     
      this.createChart('scatter');
    }else{}
  }

  createChart(type:any){
    this.chart = new Chart('drawChart', {
      type: type == 'area' ? 'line' : type,
      data: {
        labels: this.labelData,
        datasets: type != 'area' && type!='radar' ? [
          {
            label: 'Count',
            data: this.countData,
            backgroundColor: '#9999FF'
          },
        ] : this.countData
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2.0,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
            },
            grid: {
              color: 'surfaceBorder',
              drawOnChartArea: false
            }
          },
          y: {
            beginAtZero: false,
            ticks: {
              color: '#9999FF',
              stepSize: 20,
              callback: function (value: any) {
                return value;
              },
            },
            grid: {
              color: '#E0E0E0',
              drawOnChartArea: true
            }
          }
        },
      },
    });
  }

}
