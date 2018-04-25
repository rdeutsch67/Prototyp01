import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'date-component',
  templateUrl: './date.component.html'
})

export class DateComponent implements OnInit, OnChanges {
  @Input() date: string;
  @Output() dateChange = new EventEmitter<string>();

  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;

  constructor() {
    console.debug('date in contructor', this.date);
  }

  ngOnInit() {
    console.debug('date in ngOnInit', this.date);
  }

  ngOnChanges(change) {
    console.debug('date in ngOnChanges', this.date);

    let date = new Date(this.date);
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
  }

  apply() {
    let date = new Date(this.year, this.month-1, this.day, this.hour, this.minute);
    this.dateChange.next(date.toISOString());
  }
}
