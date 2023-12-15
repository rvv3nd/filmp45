import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/programa-general',
    pathMatch: 'full'
  },
  {
    path: 'folder/programa-general',
    loadChildren: () => import('./folder/programa-general/programa-general.module').then( m => m.ProgramaGeneralPageModule)
  },
  {
    path: 'folder/agenda',
    loadChildren: () => import('./folder/agenda/agenda-routing.module').then( m => m.AgendaPageRoutingModule)
  },
  {
    path: 'folder/categorias',
    loadChildren: () => import('./folder/categorias/categorias-routing.module').then( m => m.CategoriasPageRoutingModule)
  },
  {
    path: 'folder/bienvenida',
    loadChildren: () => import('./folder/bienvenida/bienvenida-routing.module').then( m => m.BienvenidaPageRoutingModule)
  },
  {
    path: 'folder/estado-invitado',
    loadChildren: () => import('./folder/estado-invitado/estado-invitado-routing.module').then( m => m.EstadoInvitadoPageRoutingModule)
  },
  {
    path: 'folder/organizadores',
    loadChildren: () => import('./folder/organizadores/organizadores-routing.module').then( m => m.OrganizadoresPageRoutingModule)
  },
  {
    path: 'folder/mapa',
    loadChildren: () => import('./folder/mapa/mapa-routing.module').then( m => m.MapaPageRoutingModule)
  },
  {
    path: 'folder/salones',
    loadChildren: () => import('./folder/salones/salones-routing.module').then( m => m.SalonesPageRoutingModule)
  },
  {
    path: 'folder/jornadas-juveniles',
    loadChildren: () => import('./folder/jornadas-juveniles/jornadas-juveniles-routing.module').then( m => m.JornadasJuvenilesPageRoutingModule)
  },
  {
    path: 'folder/sede',
    loadChildren: () => import('./folder/sede/sede-routing.module').then(m => m.SedePageRoutingModule)
  },
  {
    path: 'folder/entrada-general',
    loadChildren: () => import('./folder/entrada-general/entrada-general-routing.module').then(m => m.EntradaGeneralPageRoutingModule)
  },
  {
    path: 'folder/informacion-adicional',
    loadChildren: () => import('./folder/informacion-adicional/informacion-adicional-routing.module').then(m => m.InformacionAdicionalPageRoutingModule)
  },
  {
    path: 'folder/sobre-nosotros',
    loadChildren: () => import('./folder/sobre-nosotros/sobre-nosotros-routing.module').then(m => m.SobreNosotrosPageRoutingModule)
  },
  {
    path: 'folder/categoria/:nombre',
    loadChildren: () => import('./folder/categoria/categoria-routing.module').then(m => m.CategoriaPageRoutingModule)
  },
  {
    path: 'folder/salon/:nombre',
    loadChildren: () => import('./folder/salon/salon-routing.module').then(m => m.SalonPageRoutingModule)
  },
  {
    path: 'folder/horarios',
    loadChildren: () => import('./folder/horarios/horarios-routing.module').then(m => m.HorariosPageRoutingModule)
  },
  {
    path: 'folder/editoriales',
    loadChildren: () => import('./folder/editoriales/editoriales-routing.module').then(m => m.EditorialesPageRoutingModule)
  },
  {
    path: 'folder/podcast',
    loadChildren: () => import('./folder/podcast/podcast-routing.module').then(m => m.PodcastPageRoutingModule)
  },
  {
    path: 'folder/anunciantes',
    loadChildren: () => import('./folder/anunciantes/anunciantes-routing.module').then( m => m.AnunciantesPageRoutingModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
