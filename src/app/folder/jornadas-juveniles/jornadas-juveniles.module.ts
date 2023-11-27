import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JornadasJuvenilesPageRoutingModule } from './jornadas-juveniles-routing.module';

import { JornadasJuvenilesPage } from './jornadas-juveniles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JornadasJuvenilesPageRoutingModule
  ],
  declarations: [JornadasJuvenilesPage]
})
export class JornadasJuvenilesPageModule {}
