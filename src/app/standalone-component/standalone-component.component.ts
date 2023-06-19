import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone:true,
  selector: 'app-standalone-component',
  templateUrl: './standalone-component.component.html',
  styleUrls: ['./standalone-component.component.css'],
  imports: [NgChartsModule],
})
export class StandaloneComponentComponent {
  chart:any;
  
constructor(){}

ngOnInit(){
  this.chart = new Chart('drawChart', {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Aprl','May','Jun','July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
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
