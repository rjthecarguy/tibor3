import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Rounds } from './rounds';

@NgModule({
  declarations: [
    Rounds,
  ],
  imports: [
    IonicPageModule.forChild(Rounds),
  ],
  exports: [
    Rounds
  ]
})
export class RoundsModule {}
