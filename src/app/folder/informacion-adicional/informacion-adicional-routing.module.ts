import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionAdicionalPage } from './informacion-adicional.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionAdicionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionAdicionalPageRoutingModule {}
