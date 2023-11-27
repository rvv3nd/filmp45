import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramaGeneralPageRoutingModule } from './programa-general-routing.module';

import { ProgramaGeneralPage } from './programa-general.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramaGeneralPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProgramaGeneralPage]
})
export class ProgramaGeneralPageModule {}
