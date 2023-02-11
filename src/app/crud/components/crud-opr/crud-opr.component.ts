import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Config } from '../../../config';

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
  reactiveForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private crudSrv: CrudService, private snackBar: MatSnackBar) {
    this.cols = Config.column;
    this.cols > 3 ? this.cols = 3 : this.cols = this.cols;
    this.config.itemsPerPage = Config.itemsPerPage;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      empDate: new FormControl(''),
      empSal: new FormControl(''),
      empCourtesy: new FormControl('NA'),
      empTitle: new FormControl('NA'),
      empLast: new FormControl(''),
      empId: new FormControl(''),
      empHasPass: new FormControl(''),
      gender: new FormControl(''),
      empFirst: new FormControl('')
    });
    this.employeeForm = this.formBuilder.group({
      employeeArray: this.formBuilder.array([]),
    });
    this.getData();
  }

  getData() {
    this.crudSrv.getEmpData().subscribe((data: any) => {
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
    this.reactiveForm.get('empDate').setValue('');
    this.reactiveForm.get('empFirst').setValue('');
    this.reactiveForm.get('gender').setValue('');
    this.reactiveForm.get('empHasPass').setValue('');
    this.reactiveForm.get('empId').setValue('');
    this.reactiveForm.get('empLast').setValue('');
    this.reactiveForm.get('empTitle').setValue('NA');
    this.reactiveForm.get('empCourtesy').setValue('NA');
    this.reactiveForm.get('empSal').setValue('');
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
    this.crudSrv.updateEmpData(JSON.stringify(this.employeeForm.get('employeeArray')['controls'][index].value), this.employeeForm.get('employeeArray')['controls'][index].value['id']).subscribe((data: any) => {
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
      this.crudSrv.deleteEmpData(this.employeeForm.get('employeeArray')['controls'][index].value['id']).subscribe((data: any) => {
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
      "dateOfJoining": this.reactiveForm.get('empDate').value,
      "firstName": this.reactiveForm.get('empFirst').value,
      "gender": this.reactiveForm.get('gender').value,
      "hasPassport": this.reactiveForm.get('empHasPass').value,
      "id": this.reactiveForm.get('empId').value,
      "lastName": this.reactiveForm.get('empLast').value,
      "salary": this.reactiveForm.get('empSal').value,
      "title": this.reactiveForm.get('empTitle').value,
      "titleOfCourtesy": this.reactiveForm.get('empCourtesy').value
    }

    this.crudSrv.insertEmpData(payload).subscribe((data: any) => {
      this.employeeForm = this.formBuilder.group({
        employeeArray: this.formBuilder.array([]),
      });
      this.reactiveForm.get('empDate').setValue('');
      this.reactiveForm.get('empFirst').setValue('');
      this.reactiveForm.get('gender').setValue('');
      this.reactiveForm.get('empHasPass').setValue('');
      this.reactiveForm.get('empId').setValue('');
      this.reactiveForm.get('empLast').setValue('');
      this.reactiveForm.get('empTitle').setValue('NA');
      this.reactiveForm.get('empCourtesy').setValue('NA');
      this.reactiveForm.get('empSal').setValue('');
      this.getData();
      this.snackBar.open('Data updated successfully!!', '', {
        duration: 3000
      });
    })

  }




}
