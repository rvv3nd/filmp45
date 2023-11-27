import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /**
   * Este servicio permite obtener el modo de color Dark/Light 
   */

  private isModeLight = new BehaviorSubject<boolean>(true);
  isModeLigth$ = this.isModeLight.asObservable();

  constructor() {
    this.checkMode();
  }

  getMode():boolean{
    return this.isModeLight.value;
  }

  /**
   * Checa las preferencias del usuario para saber que modo esta activo /light/dark.
   */
  private checkMode(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //console.log("This user", prefersDark ? 'prefers Dark' : 'prefers light');
    this.isModeLight.next(!prefersDark) // si es true== dark pasa false a isModeLight
  }

}


