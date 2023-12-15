import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnunciantesPage } from './anunciantes.page';

const routes: Routes = [
  {
    path: '',
    component: AnunciantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnunciantesPageRoutingModule {}
