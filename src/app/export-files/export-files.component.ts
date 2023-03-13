import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { ExportToCsv } from 'export-to-csv';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
// import { saveAs } from 'file-saver';
// import htmlDocx from 'html-docx-js/dist/html-docx';

@Component({
  selector: 'app-export-files',
  templateUrl: './export-files.component.html',
  styleUrls: ['./export-files.component.css']
})
export class ExportFilesComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  countryDetObj: any = []; //store country details getting from service
  exportAsConfig: ExportAsConfig = {
    type: 'png', // the type you want to download
    elementIdOrContent: 'customers',
  }

  exportAsConfigTxt: ExportAsConfig = {
    type: 'txt', // the type you want to download
    elementIdOrContent: 'customers',
  }

  exportAsConfigJSON: ExportAsConfig = {
    type: 'json', // the type you want to download
    elementIdOrContent: 'customers',
  }

  constructor(private landingSrv: LandingService,private exportAsService: ExportAsService) { }

  ngOnInit(): void {
    this.getCountryCodesData();
  }

  //Get country list with currency codes
  getCountryCodesData() {
    this.subscriptionsList.push(
      this.landingSrv.getCountryData(1, 10).subscribe((data: any) => {
        if (data) {
          this.countryDetObj = data;
        }
      })
    );
  }

  export() {
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

  exportPDF() {
    const doc = new jsPDF("p", "pt", "a4");
    const source = document.getElementById("customers");
    // doc.text("Test", 40, 20);
    doc.setFontSize(8)
    doc.html(source, {
      callback: function (pdf) {
        doc.output("dataurlnewwindow"); // preview pdf file when exported
      }
    });
  }

  downloadDoc(orientation = 'landscape') {
    var preHTML = '<!DOCTYPE html><html><head><title></title>';
    var postHTML = '</head><body></body></html>';
    var html = preHTML+document.getElementById('customers').innerHTML+postHTML;
    var blob = new Blob(['\ufeff',html],{
      type: 'application/msword'
    })

    var url = 'data:application/vnd.ms-word;charset=utf-8,'+encodeURIComponent(html)
    var filename = filename?filename+ '.doc':'document.doc';
    var downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();

    document.body.removeChild(downloadLink);

    // const blob1 = htmlDocx.asBlob(html_document, { orientation: orientation, margins: { top: 1, left: 1, right: 1 } });

    // const html = '<html><head><link rel="stylesheet" type="text/css" href="/styles/page.css"></head><body><div className={bold}>I am bold!</div></body></html>'
    // saveAs(htmlDocx.asBlob(html_document), 'country.docx');


  }

  downloadCSV() {
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Country CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
   
  const csvExporter = new ExportToCsv(options);
   
  csvExporter.generateCsv(this.countryDetObj);
  }

  exportPNG() {
    this.exportAsService.save(this.exportAsConfig, 'Country').subscribe(() => {
      // save started
    });   
  }

  exportTxt(){
    this.exportAsService.save(this.exportAsConfigTxt, 'Country').subscribe(() => {
      // save started
    }); 
  }

  exportJson(){
    this.exportAsService.save(this.exportAsConfigJSON, 'Country').subscribe(() => {
      // save started
    }); 
  }
}
