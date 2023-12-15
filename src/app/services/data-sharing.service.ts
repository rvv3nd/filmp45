import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private eliminarElementoSubject = new Subject<string>();
  eliminarElemento$ = this.eliminarElementoSubject.asObservable();

  eliminarElemento(elementoId: string) {
    for(let i = 0; i < this.actividadesAgendadas.length; i++){
      if(this.actividadesAgendadas[i]._id === elementoId){
        this.actividadesAgendadas.splice(i, 1);
        break;
      }
    }
  }

  actividadesAgendadas = [] as any;

  private sharedData: any;

  setSharedData(data: any) {
    console.log('setSharedData', data);
    this.sharedData = data;
  }

  getSharedData() {
    console.log('getSharedData', this.sharedData);
    return this.sharedData;
  }
}
