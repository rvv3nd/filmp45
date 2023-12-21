import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { PouchdbService } from 'src/app/services/pouchdb.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.page.html',
  styleUrls: ['./editoriales.page.scss'],
})
export class EditorialesPage implements OnInit {
  @ViewChild(IonContent) ionContent!: IonContent; // se invoca el content para poder hacer scroll hacia arriba con el fab-boton
  editorialesFiltradas :any[] = [];
  editoriales :any[] = []; 
  constructor(
    private pouchDB : PouchdbService,
    public loadingService: LoadingService,
    private themeService: ThemeService
  ) { }
  sinResultados = false;
  isLightMode = true;
  ngOnInit() {
    this.loadingService.setIsLoading(true);
    console.log(this.loadingService.getIsLoading());
    this.themeService.isModeLigth$.subscribe((isLightTheme) => {
      this.isLightMode = isLightTheme;
      console.log('isLightTheme', isLightTheme);
    });
  }

  ngAfterViewInit() {
    this.getEditoriales().then((actividades) => {
      //console.log('editoriales ngAfterViewInit', this.editoriales);
      this.editoriales = actividades ? actividades as any : [] as any[];
      console.log('editoriales ngAfterViewInit', this.editoriales);
      this.editorialesFiltradas = this.editoriales;
      this.loadingService.setIsLoading(false);
    });
  }

  async getEditoriales() {
    return this.pouchDB.getAllEditoriales().then((data) => {
      console.log('editoriales', data);
      this.editoriales = data;
      this.ordenarPorNombre(this.editoriales);
      // for(let editorial of this.editoriales){
      //   console.log('editorial nombre', (editorial as any).nombre ? (editorial as any).nombre : editorial);
      // }
      return this.editoriales;
    }).catch((err) => {
      console.log('error editoriales',err);
      return [];
    });
  }

  buscarEditorial(event: any) {
    let texto = event.target.value;
    this.editorialesFiltradas = [];
    console.log('buscando...', texto);
    if (texto && texto != '') {
      this.editorialesFiltradas = this.editoriales.filter((editorial) => {
        const nombre = (editorial as any).nombre.toLowerCase();
        const tematicas = (editorial as any).tematicas.toLowerCase();
        const direccion = (editorial as any).direccion.toLowerCase();
        return nombre.indexOf(texto.toLowerCase()) > -1 || tematicas.indexOf(texto.toLowerCase()) > -1 || direccion.indexOf(texto.toLowerCase()) > -1 ;
      });
      if(this.editorialesFiltradas.length == 0){
        this.sinResultados = true;
      }else {
        this.sinResultados = false;
      }
    }else{
      this.sinResultados = false;
      this.editorialesFiltradas = this.editoriales;
    }
    console.log('editoriales filtradas', this.editorialesFiltradas);
  }

  //ordena un array de objetos por el campo nombre
  ordenarPorNombre(array: any[]) {
    return array.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
  }

  scrollToTop() {
    this.ionContent.scrollToTop(500);
  }

}
