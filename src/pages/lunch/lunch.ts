import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report'

/**
 * Generated class for the Lunch page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-lunch',
  templateUrl: 'lunch.html',
})
export class Lunch {

	lunchStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public report:Report) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Lunch');
  }


postLunch() {



	this.report.postDateTime();
	this.report.postEntry(" - " + this.lunchStatus +  "\n\n");
	this.navCtrl.pop();


}
}
