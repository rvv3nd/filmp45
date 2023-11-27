import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {
  @Input() days: string[] = [];
  @Input() selectedDay = 'Obteniendo dias...';
  @Output() selectedDayChange = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {
  }

  onSelectedDayChange(day: string) {
    this.selectedDay = day;
    this.selectedDayChange.emit(this.selectedDay);
  }

}
