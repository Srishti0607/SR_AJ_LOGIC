import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../services/landing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Config } from '../config';

@Component({
  selector: 'app-crud-opr',
  templateUrl: './crud-opr.component.html',
  styleUrls: ['./crud-opr.component.css']
})
export class CrudOprComponent implements OnInit {
  cols: number;
  employeeForm: FormGroup; //form group 
  deleteClicked: boolean = false
  insertFlag: boolean = false;
  empDataObj: any = [];
  config = {
    itemsPerPage: 1,
    currentPage: 1,
    totalItems: 0
  };
  empDate: any;
  empFirst: any;
  gender: any;
  empHasPass: any;
  empId: any;
  empLast: any;
  empTitle: any = "NA";
  empCourtesy: any = "NA";
  empSal: any;


  constructor(private formBuilder: FormBuilder, private landingSrv: LandingService, private snackBar: MatSnackBar) {
    this.cols = Config.column;
    this.cols > 3 ? this.cols = 3 : this.cols = this.cols;
    this.config.itemsPerPage = Config.itemsPerPage;
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeArray: this.formBuilder.array([]),
    });
    this.getData();
  }

  getData() {
    this.landingSrv.getEmpData().subscribe((data: any) => {
      if (data) {
        this.empDataObj = data;
        this.config.totalItems = this.empDataObj.length;
        const userCtrl = this.employeeForm.get('employeeArray') as FormArray;
        data.forEach(emp => {
          userCtrl.push(this.createEmployeeForm(emp, ''));
        });
        const elm = document.getElementById('grid');
        elm.style.gridTemplateColumns = `repeat( ${this.cols}, 1fr)`;
      }
    })
  }

  fieldGlobalIndex(index) {
    return this.config.itemsPerPage * (this.config.currentPage - 1) + index;
  }

  createEmployeeForm(employee, opr) {
    return this.formBuilder.group({
      id: [{ value: employee.id, disabled: opr == 'I' ? false : true }, [Validators.required]],
      firstName: [{ value: employee.firstName, disabled: opr == 'I' ? false : true }, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      lastName: [{ value: employee.lastName, disabled: opr == 'I' ? false : true }, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      title: [{ value: employee.title, disabled: opr == 'I' ? false : true }, [Validators.required]],
      titleOfCourtesy: [{ value: employee.titleOfCourtesy, disabled: opr == 'I' ? false : true }, [Validators.required]],
      gender: [{ value: employee.gender, disabled: opr == 'I' ? false : true }, [Validators.required]],
      hasPassport: [{ value: employee.hasPassport, disabled: opr == 'I' ? false : true }, [Validators.required]],
      dateOfJoining: [{ value: employee.dateOfJoining, disabled: opr == 'I' ? false : true }, [Validators.required]],
      salary: [{ value: employee.salary, disabled: opr == 'I' ? false : true }, [Validators.required]]
    });
  }

  cancelInsert() {
    this.empDate = ""
    this.empFirst = "";
    this.gender = "";
    this.empHasPass = "";
    this.empId = "";
    this.empLast = "";
    this.empTitle = "NA";
    this.empCourtesy = "NA";
    this.empSal = "";
  }

  onSelectionChange(item, i) {
    if (item['hasPassport']) {
      item['hasPassport'] = false;
    } else {
      item['hasPassport'] = true;
    }
  }

  editForm(index) {
    this.employeeForm.get('employeeArray')['controls'][index].enable();
  }

  updateForm(index) {
    this.landingSrv.updateEmpData(JSON.stringify(this.employeeForm.get('employeeArray')['controls'][index].value), this.employeeForm.get('employeeArray')['controls'][index].value['id']).subscribe((data: any) => {
      if (data) {
        this.employeeForm = this.formBuilder.group({
          employeeArray: this.formBuilder.array([]),
        });
        this.getData();
        this.snackBar.open('Data updated successfully!!', '', {
          duration: 3000
        });
      }
    })
  }

  cancelForm(index) {
    this.employeeForm.get('employeeArray')['controls'][index].disable();
  }

  deleteForm(index) {
    this.deleteClicked = true;
    if (confirm("Are you sure you want to delete the record?")) {
      this.landingSrv.deleteEmpData(this.employeeForm.get('employeeArray')['controls'][index].value['id']).subscribe((data: any) => {
        this.deleteClicked = false;
        this.employeeForm = this.formBuilder.group({
          employeeArray: this.formBuilder.array([]),
        });
        this.getData();
        this.snackBar.open('Data deleted successfully!!', '', {
          duration: 3000
        });
      })

    } else {
      this.deleteClicked = false;
    }
  }

  onPageChange(e) {
    this.config.currentPage = e;
  }

  insertFormData() {
    let payload = {
      "dateOfJoining": this.empDate,
      "firstName": this.empFirst,
      "gender": this.gender,
      "hasPassport": this.empHasPass,
      "id": this.empId,
      "lastName": this.empLast,
      "salary": this.empSal,
      "title": this.empTitle,
      "titleOfCourtesy": this.empCourtesy
    }

    this.landingSrv.insertEmpData(payload).subscribe((data: any) => {
      this.employeeForm = this.formBuilder.group({
        employeeArray: this.formBuilder.array([]),
      });
      this.empDate = ""
      this.empFirst = "";
      this.gender = "";
      this.empHasPass = "";
      this.empId = "";
      this.empLast = "";
      this.empTitle = "NA";
      this.empCourtesy = "NA";
      this.empSal = "";
      this.getData();
      this.snackBar.open('Data updated successfully!!', '', {
        duration: 3000
      });
    })

  }




}
