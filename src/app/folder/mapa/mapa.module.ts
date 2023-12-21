import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MapaPage } from './mapa.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule,
    ComponentsModule,
    PdfViewerModule
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
