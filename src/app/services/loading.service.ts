import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/***
 * Este servicio se encarga de poner un indicador de que 
 * la aplicación esta cargando un servicio o recurso 
 */
export class LoadingService {

  constructor() { }

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading = this.loadingSubject.asObservable();

  setIsLoading(value: boolean) {
    this.loadingSubject.next(value);
  }

  getIsLoading() {
    return this.loadingSubject.getValue();
  }
  // async presentLoading() {
  //   if (!this.isLoading) {
  //     this.isLoading = true;
  //     const loading = await this.loadingCtrl.create({
  //       message: 'Cargando...',
  //       spinner: 'dots'
  //     });
  //     await loading.present();
  //   }
  // }

  // async dismissLoading() {
  //   if (this.isLoading) {
  //     this.isLoading = false;
  //     await this.loadingCtrl.dismiss();
  //   }
  // }

}
