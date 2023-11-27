import { Component, OnInit } from '@angular/core';
import { assets } from '../../configs/config-app';
import { ThemeService } from  '../../services/theme.service'

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.page.html',
  styleUrls: ['./sobre-nosotros.page.scss'],
})
export class SobreNosotrosPage implements OnInit {

  constructor(
    private theme: ThemeService
  ) { }

  filmpLogo : string = assets + 'images/FILPM-45-1284x504.png';
  isModeLight: boolean = true;

  ngOnInit() {
    this.isModeLight = this.theme.getMode();
  }

}
