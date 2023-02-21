import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InventoryClass } from '../inventory.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  reactiveForm:FormGroup;
  showTable: boolean = false;
  inventory : InventoryClass;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reactiveForm =  this.fb.group({
      libraryName :[''],
      address: [''],
      librarianName:[''],
      books: this.fb.array([
        this.fb.control('')
      ])
   })
 }

  get books(){
    return this.reactiveForm.get('books') as FormArray;
  }

  addBooks(){
    this.books.push(this.fb.control(''));
  }

  showDetails(){
    this.showTable = true;
    this.inventory = this.reactiveForm.value;
    this.inventory = new InventoryClass(this.reactiveForm.get('libraryName').value,this.reactiveForm.get('address').value,this.reactiveForm.get('librarianName').value,this.reactiveForm.get('books').value)
  }

}
