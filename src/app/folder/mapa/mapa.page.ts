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
  srcPA = '';
  srcPB = '';
  clicked = false;
  zoomLevel = 1;
  plantaSeleccionada = 'plantaBaja';
  seccionPBSeleccionada: string | undefined;
  seccionPASeleccionada: string | undefined;
  standsPlantaBaja = [] as any;
  standsPlantaBajaFiltered = [] as any;
  sectionsPlantaBaja = [] as any;
  standsPlantaAlta = [] as any;
  standsPlantaAltaFiltered = [] as any;
  sectionsPlantaAlta = [] as any;
  doubleBack = false;
  
  ngAfterViewInit() {
    this.loading().then(() => {
      console.log('getting pdfs');
      this.pouchService.getAllPDFs().then((pdfs) => {
        console.log(pdfs);
        this.srcPA = pdfs[1].src ;
        this.srcPB = pdfs[0].src;
        console.log(this.srcPA);
        console.log(this.srcPB);
      });
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
        } catch (error) {
          this.loadingCtrl.dismiss();
          console.log(error);
        }
      }).catch((error) => {
        this.loadingCtrl.dismiss();
        console.log(error);
      });
    }).catch((error) => {
      this.loadingCtrl.dismiss();
      console.log(error);
    });
  }

  adjustZoom(factor: number): void {
    const aux = this.zoomLevel * factor;
    if(aux > this.zoomLevel){
      //esto ocurre cuando se hace zoom in, el pdf se muestra en true size
      this.clicked = true;
      this.doubleBack = false;
    }
    this.zoomLevel = aux;
    if(this.zoomLevel < 1){
      //hasta que el zoom level sea menor a 1, el pdf se muestra en true size
      this.zoomLevel = 1;
      if (this.doubleBack) {
        this.clicked = false;
      }
      else{
        this.doubleBack = true;
      }
    }else if(this.zoomLevel > 5){
      this.zoomLevel = 5;
    }
  }

  toggleZoom(){
    this.clicked = !this.clicked;
  }

  plantaChange(){
    this.clicked = false;
  }

  fullscreen(){
    this.clicked = true;
  }
  fullscreent(){
    this.clicked = false;
  }
  
  downloadPDF(){
    const link = document.createElement('a');
    if(this.plantaSeleccionada == 'plantaBaja'){
      link.href = this.srcPB;
    }else if(this.plantaSeleccionada == 'plantaAlta'){
      link.href = this.srcPA;
    }
    link.download = "mapa-" + this.plantaSeleccionada + ".pdf";
    link.click();
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

  /**
   * Crea y muestra un spinner de carga con un mensaje personalizado.
   * @returns Una promesa que se resuelve cuando se muestra el spinner de carga.
   */

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
