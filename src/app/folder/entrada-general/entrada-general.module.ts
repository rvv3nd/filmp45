import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntradaGeneralPageRoutingModule } from './entrada-general-routing.module';

import { EntradaGeneralPage } from './entrada-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntradaGeneralPageRoutingModule
  ],
  declarations: [EntradaGeneralPage]
})
export class EntradaGeneralPageModule {}
