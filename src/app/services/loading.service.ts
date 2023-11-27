import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

/***
 * Este servicio se encarga de poner un indicador de que 
 * la aplicación esta cargando un servicio o recurso 
 */
export class LoadingService {

  constructor( private loadingCtrl: LoadingController) { }

  isLoading = false;

  async presentLoading() {
    if (!this.isLoading) {
      this.isLoading = true;
      const loading = await this.loadingCtrl.create({
        message: 'Cargando...',
        spinner: 'dots'
      });
      await loading.present();
    }
  }

  async dismissLoading() {
    if (this.isLoading) {
      this.isLoading = false;
      await this.loadingCtrl.dismiss();
    }
  }

}
