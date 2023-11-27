import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-informacion-adicional',
  templateUrl: './informacion-adicional.page.html',
  styleUrls: ['./informacion-adicional.page.scss'],
})
export class InformacionAdicionalPage implements OnInit {

  isModeLight = true;
  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.isModeLight = this.themeService.getMode();
  }

}
