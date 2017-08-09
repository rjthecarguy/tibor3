import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Maint } from './maint';

@NgModule({
  declarations: [
    Maint,
  ],
  imports: [
    IonicPageModule.forChild(Maint),
  ],
  exports: [
    Maint
  ]
})
export class MaintModule {}
