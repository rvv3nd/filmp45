import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Programa general', url: '/folder/programa-general', icon: 'home' },
    { title: 'Categorías', url: '/folder/categorias', icon: 'pricetags' },
    { title: 'Salones', url: '/folder/salones', icon: 'easel' },
    { title: 'Mi agenda', url: '/folder/agenda', icon: 'bookmark' },
    { title: 'Mapa del evento', url: '/folder/mapa', icon: 'map' },
  ];

  public labels = [
    { title: 'Podcast', url: '/folder/podcast', icon: 'radio'},
    { title: 'Jornadas juveniles', url: '/folder/jornadas-juveniles', icon: 'school' },
    { title: "Editoriales", url: 'folder/editoriales', icon:"book" },
    { title: 'Organizadores', url: '/folder/organizadores', icon: 'people' },
    { title: 'Sede', url: '/folder/sede', icon: 'business' },
    { title: 'Entrada general', url: '/folder/entrada-general', icon: 'ticket' },
    { title: "Anunciantes", url: 'folder/anunciantes', icon:"megaphone" },
    { title: 'Información adicional', url: 'folder/informacion-adicional', icon: 'information'},
    { title: "Acerca de nosotros", url: 'folder/sobre-nosotros', icon:"globe"}
  ];





  constructor() {}
}
