import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ActividadesComponent } from 'src/app/components/actividades/actividades.component';
@Component({
  selector: 'app-salon',
  templateUrl: './salon.page.html',
  styleUrls: ['./salon.page.scss'],
})
export class SalonPage implements OnInit {
  @ViewChild(IonContent) ionContent!: IonContent;
  @ViewChild(ActividadesComponent) actividadesComponent!: ActividadesComponent;
  constructor(
    private route: ActivatedRoute,
  ) { }
  salon: string = '';
  selectedDay = 'Obteniendo dias...';
  ngOnInit() {
    this.salon = this.route.snapshot.paramMap.get('nombre') || '';
    console.log('salon', this.salon);
  }

  ngAfterViewInit() {
    console.log('cargando actividades ngAfterInit', this.salon);
    if(this.actividadesComponent) {
      if(this.salon) {
        console.log('this.salon', this.salon);
        this.actividadesComponent.getActividadesPorSalon(this.salon, true);
      } else {
        console.log('this.salon is null');
      }
    }
  }

  scrollToTop() {
    this.ionContent.scrollToTop(500);
  }

}
