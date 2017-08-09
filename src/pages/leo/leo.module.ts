import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Leo } from './leo';

@NgModule({
  declarations: [
    Leo,
  ],
  imports: [
    IonicPageModule.forChild(Leo),
  ],
  exports: [
    Leo
  ]
})
export class LeoModule {}
