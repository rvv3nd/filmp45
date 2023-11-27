import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-entrada-general',
  templateUrl: './entrada-general.page.html',
  styleUrls: ['./entrada-general.page.scss'],
})
export class EntradaGeneralPage implements OnInit {

  isModeLight = true;
  constructor( 
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.isModeLight = this.themeService.getMode();
  }

}
