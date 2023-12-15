import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPageRoutingModule } from './mapa-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MapaPage } from './mapa.page';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule,
    ComponentsModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
