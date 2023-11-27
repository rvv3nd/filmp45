import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-estado-invitado',
  templateUrl: './estado-invitado.page.html',
  styleUrls: ['./estado-invitado.page.scss'],
})
export class EstadoInvitadoPage implements OnInit {

  constructor(
    private theme: ThemeService
  ) { }
  isModeLight: boolean = true;

  ngOnInit() {
    this.isModeLight = this.theme.getMode();
  }

}
