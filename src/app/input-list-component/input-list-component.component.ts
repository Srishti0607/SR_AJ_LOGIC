import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-list-component',
  templateUrl: './input-list-component.component.html',
  styleUrls: ['./input-list-component.component.css']
})
export class InputListComponentComponent implements OnInit {
  showInput: any;

  constructor() { }

  ngOnInit(): void {
  }

}
