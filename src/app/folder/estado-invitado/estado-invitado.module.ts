import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoInvitadoPageRoutingModule } from './estado-invitado-routing.module';

import { EstadoInvitadoPage } from './estado-invitado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoInvitadoPageRoutingModule
  ],
  declarations: [EstadoInvitadoPage]
})
export class EstadoInvitadoPageModule {}
