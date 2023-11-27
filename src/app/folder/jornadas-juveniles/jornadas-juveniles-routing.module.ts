import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JornadasJuvenilesPage } from './jornadas-juveniles.page';

const routes: Routes = [
  {
    path: '',
    component: JornadasJuvenilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JornadasJuvenilesPageRoutingModule {}
