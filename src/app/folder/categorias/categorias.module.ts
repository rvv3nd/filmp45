import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasPageRoutingModule } from './categorias-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CategoriasPage } from './categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}
