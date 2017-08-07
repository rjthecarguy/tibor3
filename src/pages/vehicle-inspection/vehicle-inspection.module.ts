import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleInspection } from './vehicle-inspection';

@NgModule({
  declarations: [
    VehicleInspection,
  ],
  imports: [
    IonicPageModule.forChild(VehicleInspection),
  ],
  exports: [
    VehicleInspection
  ]
})
export class VehicleInspectionModule {}
