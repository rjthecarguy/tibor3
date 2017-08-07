import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report'

/**
 * Generated class for the Rounds page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-rounds',
  templateUrl: 'rounds.html',
})
export class Rounds {

roundStatus: any = "Start";
	


  constructor(public navCtrl: NavController, public navParams: NavParams, public report: Report) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Rounds');
  }


postRounds() {



	this.report.postDateTime();
	this.report.postEntry(" - " + this.roundStatus +  " Rounds Check\n\n");
	this.navCtrl.pop();


}


}
