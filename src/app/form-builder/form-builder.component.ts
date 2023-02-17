import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  reactiveForm:FormGroup;
  showTable: boolean = false;

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

}
