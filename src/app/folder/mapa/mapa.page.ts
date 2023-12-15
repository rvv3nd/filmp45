import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PouchdbService } from 'src/app/services/pouchdb.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  found: boolean = true;
  constructor(
    private pouchService : PouchdbService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    
  }
  plantaSeleccionada = 'plantaBaja';
  seccionPBSeleccionada: string | undefined;
  seccionPASeleccionada: string | undefined;
  standsPlantaBaja = [] as any;
  standsPlantaBajaFiltered = [] as any;
  sectionsPlantaBaja = [] as any;
  standsPlantaAlta = [] as any;
  standsPlantaAltaFiltered = [] as any;
  sectionsPlantaAlta = [] as any;
  ngAfterViewInit() {
    this.loading().then(() => {
      this.pouchService.getStands().then((stands) => {

        //Obtiene stands
        this.standsPlantaBaja = stands.rows.filter((stand: any) => {
          if(stand.value.section.floor == 'Planta baja'){
            return stand
          }else {
            return null;
          }
        });
        this.standsPlantaAlta = stands.rows.filter((stand: any) => {
          if(stand.value.section.floor == 'Planta alta'){
            return stand
          }else{
            return null;
          }
        });
        let res : Set<string> = new Set();
        let res2 : Set<string> = new Set();
        //Obtiene secciones
        for(let stand of this.standsPlantaBaja){
          res.add(stand.value.section.name);
        }
        this.sectionsPlantaBaja = Array.from(res);
        for(let stand of this.standsPlantaAlta){
          res2.add(stand.value.section.name);
        }
        this.sectionsPlantaAlta = Array.from(res2);
        this.sectionsPlantaBaja = this.ordenarAlfanumericamente(this.sectionsPlantaBaja);
        this.sectionsPlantaAlta = this.ordenarAlfanumericamente(this.sectionsPlantaAlta);
        this.seccionPBSeleccionada = this.sectionsPlantaBaja[0];
        this.seccionPASeleccionada = this.sectionsPlantaAlta[0];

        this.standsPlantaBajaFiltered = this.standsPlantaBaja.filter((stand: any) => {
          if(stand.value.section.name == this.seccionPBSeleccionada){
            return stand;
          }else{
            return null;
          }
        });

        this.standsPlantaAltaFiltered = this.standsPlantaAlta.filter((stand: any) => {
          if(stand.value.section.name == this.seccionPASeleccionada){
            return stand;
          }else{
            return null;
          }
        });
        console.log(this.standsPlantaBajaFiltered);
        console.log(this.standsPlantaAltaFiltered);
        this.loadingCtrl.dismiss();
      });
    })
  }

  seccionPBChange(value: any){
    this.standsPlantaBajaFiltered = this.standsPlantaBaja.filter((stand: any) => {
      if(stand.value.section.name == value){
        return stand;
      }else{
        return null;
      }
    });
    console.log(this.standsPlantaBajaFiltered);
  }

  seccionPAChange(value: any){
    this.standsPlantaAltaFiltered = this.standsPlantaAlta.filter((stand: any) => {
      if(stand.value.section.name == value){
        return stand;
      }else{
        return null;
      }
    });
  }

  async loading(){
    return this.loadingCtrl.create({
      message: 'Cargando mapa...'
    }).then((loading) => {
      console.log('loading presenting');
      return loading.present();
    })
  }

  ordenarAlfanumericamente(arr: string[]): string[] {
    return arr.sort((a, b) => {
      // Extraer los números de las cadenas
      const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
  
      // Comparar números y cadenas alfanuméricas
      if (numA === numB) {
        // Si los números son iguales, ordenar por la cadena completa
        return a.localeCompare(b);
      } else {
        return numA - numB;
      }
    });
  }

}
