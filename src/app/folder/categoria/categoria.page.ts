import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ActividadesComponent } from 'src/app/components/actividades/actividades.component';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit, AfterViewInit {
  nombreCategoria: string  = 'Obteniendo categoria...';
  selectedDay = 'Obteniendo dias...';
  @ViewChild(ActividadesComponent) actividadesComponent!: ActividadesComponent;
  @ViewChild(IonContent) ionContent!: IonContent;

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.nombreCategoria = this.route.snapshot.paramMap.get('nombre') || 'Obteniendo categoria...';
    console.log('nombreCategoria', this.nombreCategoria);
  }

  ngAfterViewInit() {

    console.log('cargando actividades ngAfterInit', this.actividadesComponent, this.nombreCategoria);
    // se asegura de que actividadesComponent no sea null antes de llamar a sus métodos
    if (this.actividadesComponent) {
      if (this.nombreCategoria) {
        console.log('this.nombreCategoria', this.nombreCategoria);
        this.actividadesComponent.getActividadesPorCategoria(this.nombreCategoria, true);
      } else {
        //Se asegura de que actividadesComponent no sea null antes de llamar a sus métodos
        console.log('this.nombreCategoria is null');
      }
    }
  }

  scrollToTop() {
    this.ionContent.scrollToTop(500);
  }

}
