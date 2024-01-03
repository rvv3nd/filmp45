import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ActividadesComponent } from 'src/app/components/actividades/actividades.component';
import { DaysComponent } from 'src/app/components/days/days.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { PouchdbService } from 'src/app/services/pouchdb.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  @Input() days: string[] = [];
  @ViewChild(ActividadesComponent) actividadesComponent!: ActividadesComponent;
  @ViewChild(DaysComponent) daysComponent!: DaysComponent;
  @ViewChild(IonContent) ionContent!: IonContent; // se invoca el content para poder hacer scroll hacia arriba con el fab-boton

  found : boolean = true;
  isModeLight: boolean = true;
  actividades: any[] = [];
  constructor(
    private router: Router,
    private pouchdbService: PouchdbService,
    private dataSh : DataSharingService,
    private themeService : ThemeService
  ) { }

  ngOnInit() {
    this.isModeLight = this.themeService.getMode();
  }

  async ngAfterViewInit() {
    this.actividadesComponent.getActividadesAgendadas(true).then((found : boolean) => {
      this.found = found;
      console.log('found: ', found);
    });
  }



  scrollToTop() {
    this.ionContent.scrollToTop(500);
  }

}
