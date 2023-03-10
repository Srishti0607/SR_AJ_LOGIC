import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-export-files',
  templateUrl: './export-files.component.html',
  styleUrls: ['./export-files.component.css']
})
export class ExportFilesComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  countryDetObj: any = []; //store country details getting from service
  @ViewChild('TABLE') table: ElementRef;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getCountryCodesData();
  }

    //Get country list with currency codes
    getCountryCodesData() {
      this.subscriptionsList.push(
        this.landingSrv.getCountryData(1,10).subscribe((data: any) => {
          if (data) {
            this.countryDetObj = data;
          }
        })
      );
    }

    export()
    {
        let Heading: any = []
          Object.keys(this.countryDetObj[0]).forEach(res => {
            Heading.push(res);
          })
        let exceldata: any = [];
        for (let i = 1; i < this.countryDetObj.length; i++) {
          exceldata.push(this.countryDetObj[i])
        }
        const wb = XLSX.utils.book_new();
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [Heading]);
        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, exceldata, { origin: 'A2', skipHeader: true });
        for (let itm in ws) {
          if (typeof ws[itm] != 'object') continue;
          let cell = XLSX.utils.decode_cell(itm);
          ws[itm].s = {
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" }
            }
          }
          if (cell.r == 0) {
            // first row
            ws[itm].s.font = {
              bold: true,
            };
          }
        }
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'country-list.xlsx');      
    }

}
