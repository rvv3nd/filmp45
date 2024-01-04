import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PouchdbService } from '../../services/pouchdb.service';
import { ActividadesComponent } from 'src/app/components/actividades/actividades.component';
import { IonContent, IonModal, LoadingController } from '@ionic/angular';

import { OverlayEventDetail } from '@ionic/core';
import { AnunciantesService } from 'src/app/services/anunciantes.service';
@Component({
  selector: 'app-programa-general',
  templateUrl: './programa-general.page.html',
  styleUrls: ['./programa-general.page.scss'],
})
export class ProgramaGeneralPage implements OnInit, AfterViewInit {
  @ViewChild(ActividadesComponent) actividadesComponent!: ActividadesComponent; // se obtiene el componente hijo para poder llamar a sus metodos
  @ViewChild(IonContent) ionContent!: IonContent; // se invoca el content para poder hacer scroll hacia arriba con el fab-boton
  @ViewChild(IonModal) modal!: IonModal; // se invoca el modal para poder cerrarlo desde el padre
  constructor(
    private pouchDBService: PouchdbService,
    private loadingCtrl: LoadingController,
    private anunciantesServ: AnunciantesService,
  ) { }

  anuncio: any;
  found = true;
  local: any;
  actividades : any[] = []
  
  ngOnInit() {
    try{
      this.local = this.pouchDBService.getLocalDB();
      console.log('local', this.local);
      if(this.local){
        this.loadingCtrl.create({
          message: 'Cargando anuncio...'
        }).then(loading => loading.present().then(() => {
            this.getRandomPublicidad().then(() => {
              console.log('anuncio cargado', this.anuncio);
            });
        }));
      }
    }catch(err){
      this.found = false;
      console.log(err);
    }
  }

  ngAfterViewInit() {
    console.log('cargando actividades ngAfterInit', this.actividadesComponent);
    // Asegúrate de que actividadesComponent no sea null antes de llamar a sus métodos
    if (this.actividadesComponent) {
      this.actividadesComponent.getActividadesPorDia(true).then((found) => {
        this.found = found;
      });
    }
  }



  scrollToTop() {
    this.ionContent.scrollToTop(500);
  }

  enlace(url: string) {
    window.open(url, '_self');
  }

  cerrarModal() {
    this.modal.dismiss();
  }

  async getRandomPublicidad() {
    this.anuncio = await this.anunciantesServ.getRandomAnunciante();
    console.log('anuncio', this.anuncio);
    console.log('presentando modal...', this.actividadesComponent);
    this.modal.present().then(() => {
      setTimeout(() => {
        this.modal.dismiss();
      }
      , 10000);
    })
    this.loadingCtrl.dismiss().then(() => { 
      if(this.actividades.length == 0) this.found = false;
      console.log('loading dismissed'); 
    });
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('Confirmado');
    }
  }
}
