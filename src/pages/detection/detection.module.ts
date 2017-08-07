import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Detection } from './detection';

@NgModule({
  declarations: [
    Detection,
  ],
  imports: [
    IonicPageModule.forChild(Detection),
  ],
  exports: [
    Detection
  ]
})
export class DetectionModule {}
