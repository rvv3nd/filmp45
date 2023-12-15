
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.page.html',
  styleUrls: ['./sede.page.scss'],
})
export class SedePage implements OnInit {
  @ViewChild('googleMapIframe')
  googleMapIframe!: ElementRef;
  
  constructor( private loadingService : LoadingController ) { }
  ngOnInit() {
    this.loadingService.create(
      {
        message: 'Cargando mapa...',
        spinner: 'lines-sharp',
        cssClass: 'custom-loading'
      }
    ).then(( res ) => {
      res.present();
      console.log('Se muestra loading');
      setTimeout(() => {
        this.loadingService.dismiss();
      }, 1000);
    });
  }

  onIframeLoad(){
    


  }

}
