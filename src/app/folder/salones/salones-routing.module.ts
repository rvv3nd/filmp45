import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonesPage } from './salones.page';

const routes: Routes = [
  {
    path: '',
    component: SalonesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonesPageRoutingModule {}
