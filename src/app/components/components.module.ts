import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotFoundComponent } from './not-found/not-found.component';
import { DaysComponent } from './days/days.component';

@NgModule({
    declarations: [NotFoundComponent, DaysComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [NotFoundComponent, DaysComponent]
    })
export class ComponentsModule {}
