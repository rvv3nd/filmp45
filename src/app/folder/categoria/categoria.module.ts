import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CategoriaPage } from './categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
