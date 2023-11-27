import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoInvitadoPage } from './estado-invitado.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoInvitadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoInvitadoPageRoutingModule {}
