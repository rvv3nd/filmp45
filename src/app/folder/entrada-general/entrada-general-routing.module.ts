import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntradaGeneralPage } from './entrada-general.page';

const routes: Routes = [
  {
    path: '',
    component: EntradaGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntradaGeneralPageRoutingModule {}
