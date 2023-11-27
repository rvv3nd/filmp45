import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramaGeneralPage } from './programa-general.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramaGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramaGeneralPageRoutingModule {}
