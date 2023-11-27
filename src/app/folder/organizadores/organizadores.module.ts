import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizadoresPageRoutingModule } from './organizadores-routing.module';

import { OrganizadoresPage } from './organizadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizadoresPageRoutingModule
  ],
  declarations: [OrganizadoresPage]
})
export class OrganizadoresPageModule {}
