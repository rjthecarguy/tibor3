import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report'

/**
 * Generated class for the Maint page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-maint',
  templateUrl: 'maint.html',
})
export class Maint {

	maintNotes: any;
	maintStatus: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public report:Report) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Maint');
  }


postMaint() {



	this.report.postDateTime();
	this.report.postEntry(" - " + this.maintStatus +  "\n" + " - Notes: " + this.maintNotes + "\n\n");
	this.navCtrl.pop();


}

}
