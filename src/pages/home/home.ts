import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { ActionSheet} from '../../providers/action-sheet';
import { ReportPage} from '../../pages/report-page/report-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public actionMenu: ActionSheet, public alertCtrl:AlertController) {


  }

  openSheet() {

  	this.navCtrl.setRoot(ReportPage);

  }

alertEntry() {

let alert = this.alertCtrl.create({
      title: 'Company Alert!',
      message: '',
      inputs: [
        {
          name: 'customEntry',
          placeholder: 'Alert Message'
        },
       
      ],
      buttons: [
        {
          text: 'Send Alert',
          handler: (data) => {
          
          }
        },
        
       
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });

    alert.present();

}



}
