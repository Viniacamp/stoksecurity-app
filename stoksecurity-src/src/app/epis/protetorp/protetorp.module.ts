import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProtetorpPageRoutingModule } from './protetorp-routing.module';

import { ProtetorpPage } from './protetorp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProtetorpPageRoutingModule
  ],
  declarations: [ProtetorpPage]
})
export class ProtetorpPageModule {}
