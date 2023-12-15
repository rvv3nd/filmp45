import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorialesPageRoutingModule } from './editoriales-routing.module';

import { EditorialesPage } from './editoriales.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorialesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditorialesPage]
})
export class EditorialesPageModule {}
