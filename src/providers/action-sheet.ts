import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ActionSheetController } from 'ionic-angular'
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ReportPage} from '../pages/report-page/report-page'


/*
  Generated class for the ActionSheet provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActionSheet {

  constructor(public actionSheetCtrl: ActionSheetController, public events:Events) {
    console.log('Hello ActionSheet Provider');
  }


openActionSheet(){
 console.log('opening');
 let actionsheet = this.actionSheetCtrl.create({
 title:"File a Report",
 buttons:[
 {
 text: 'Create a Photo/Video',
 handler: () => {
 	    
 	this.events.publish('Menu:page', "ReportPage");
 console.log("Camera Clicked");
 }
 },{
 text: 'Browse Photo/Video',
 handler: function(){
 console.log("Gallery Clicked");
 }
 },{
 text: 'Continue Without Photo/Video',
 handler: function(){
 console.log("Gallery Clicked");
 }
 },{
 text: 'Cancel',
 handler: function(){
 console.log("Gallery Clicked");
 }
 }


 ]
 });
 actionsheet.present();
}
  

  

}
