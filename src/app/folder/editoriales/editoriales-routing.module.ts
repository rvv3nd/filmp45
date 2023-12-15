import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorialesPage } from './editoriales.page';

const routes: Routes = [
  {
    path: '',
    component: EditorialesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorialesPageRoutingModule {}
