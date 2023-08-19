import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtetorpPage } from './protetorp.page';

const routes: Routes = [
  {
    path: '',
    component: ProtetorpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtetorpPageRoutingModule {}
