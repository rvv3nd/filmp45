import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotFoundComponent } from './not-found/not-found.component';
import { DaysComponent } from './days/days.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    declarations: [
        NotFoundComponent,
        DaysComponent, 
        ActividadesComponent, 
        LoadingComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [
        NotFoundComponent, 
        DaysComponent, 
        ActividadesComponent, 
        LoadingComponent
    ]
    })
export class ComponentsModule {}
