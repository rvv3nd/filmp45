import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-jornadas-juveniles',
  templateUrl: './jornadas-juveniles.page.html',
  styleUrls: ['./jornadas-juveniles.page.scss'],
})
export class JornadasJuvenilesPage implements OnInit {

  isModeLight = true;
  constructor( 
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.isModeLight = this.themeService.getMode();
  }

}
