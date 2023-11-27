import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'programa-general',
    loadChildren: () => import('./programa-general/programa-general.module').then( m => m.ProgramaGeneralPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'salones',
    loadChildren: () => import('./salones/salones.module').then( m => m.SalonesPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'sobre-nosotros',
    loadChildren: () => import('./sobre-nosotros/sobre-nosotros.module').then( m => m.SobreNosotrosPageModule)
  },
  {
    path: 'sede',
    loadChildren: () => import('./sede/sede.module').then( m => m.SedePageModule)
  },
  {
    path: 'estado-invitado',
    loadChildren: () => import('./estado-invitado/estado-invitado.module').then( m => m.EstadoInvitadoPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'organizadores',
    loadChildren: () => import('./organizadores/organizadores.module').then( m => m.OrganizadoresPageModule)
  },
  {
    path: 'informacion-adicional',
    loadChildren: () => import('./informacion-adicional/informacion-adicional.module').then( m => m.InformacionAdicionalPageModule)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'entrada-general',
    loadChildren: () => import('./entrada-general/entrada-general.module').then( m => m.EntradaGeneralPageModule)
  },
  {
    path: 'jornadas-juveniles',
    loadChildren: () => import('./jornadas-juveniles/jornadas-juveniles.module').then( m => m.JornadasJuvenilesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
