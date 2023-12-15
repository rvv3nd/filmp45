import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnunciantesPageRoutingModule } from './anunciantes-routing.module';

import { AnunciantesPage } from './anunciantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnunciantesPageRoutingModule
  ],
  declarations: [AnunciantesPage]
})
export class AnunciantesPageModule {}
