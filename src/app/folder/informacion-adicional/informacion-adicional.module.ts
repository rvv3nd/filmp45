import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionAdicionalPageRoutingModule } from './informacion-adicional-routing.module';

import { InformacionAdicionalPage } from './informacion-adicional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionAdicionalPageRoutingModule
  ],
  declarations: [InformacionAdicionalPage]
})
export class InformacionAdicionalPageModule {}
