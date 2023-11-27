import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizadoresPage } from './organizadores.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizadoresPageRoutingModule {}
