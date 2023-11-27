import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  @Input() days: string[] = [];
  found: boolean = true;
  constructor() { }

  ngOnInit() {
    if (this.days.length == 0) {
      this.days[0] = 'No hay dias disponibles';
    }
  }

}
