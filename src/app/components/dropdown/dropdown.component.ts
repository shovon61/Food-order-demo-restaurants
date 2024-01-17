import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() public selectedValue: any;
  @Input() public sortOptions: any;

  @Output() sortEvent = new EventEmitter();

  constructor() { }

  sortHotels = (selectedValue: any) => {
    this.sortEvent.emit(selectedValue);
  }

  ngOnInit(): void {
  }

}
