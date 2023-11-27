import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  isModeLight = true;
  constructor( 
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.isModeLight = this.themeService.getMode();
  }

}
