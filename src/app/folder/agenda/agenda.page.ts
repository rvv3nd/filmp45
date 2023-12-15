import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ActividadesComponent } from 'src/app/components/actividades/actividades.component';
import { DaysComponent } from 'src/app/components/days/days.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { PouchdbService } from 'src/app/services/pouchdb.service';

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

  found: boolean = true;
  actividades: any[] = [];
  constructor(
    private router: Router,
    private pouchdbService: PouchdbService,
    private dataSh : DataSharingService
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.actividadesComponent.getActividadesAgendadas(true);
  }



  scrollToTop() {
    this.ionContent.scrollToTop(500);
  }

}
