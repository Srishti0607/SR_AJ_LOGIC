import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-list-component',
  templateUrl: './input-list-component.component.html',
  styleUrls: ['./input-list-component.component.css']
})
export class InputListComponentComponent implements OnInit {
  reactiveForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      showInput: new FormControl('')
    });
  }

}
