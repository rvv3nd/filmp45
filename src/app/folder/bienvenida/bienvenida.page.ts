import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  isModeLight = true;
  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.isModeLight = this.themeService.getMode();
  }

}
