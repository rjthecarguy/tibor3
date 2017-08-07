import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report'

/**
 * Generated class for the Detection page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-detection',
  templateUrl: 'detection.html',
})
export class Detection {


	z1: any = false;
	z2: any = false;
	z3: any = false;
	z4: any = false;
	z5: any = false;
	z6: any = false;
	z7: any = false;
	z8: any = false;
	z9: any = false;
	z10: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public report:Report) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detection');
  }


postDetection() {

	this.report.postDateTime();
	this.report.postEntry(" - Detection Check\n" + 
							"  - Zone 1 Checked: " + this.z1 + "\n" +
							"  - Zone 2 Checked: " + this.z2 + "\n" +
							"  - Zone 3 Checked: " + this.z3 + "\n" +
							"  - Zone 4 Checked: " + this.z4 + "\n" +
							"  - Zone 5 Checked: " + this.z5 + "\n" +
							"  - Zone 6 Checked: " + this.z6 + "\n" +
							"  - Zone 7 Checked: " + this.z7 + "\n" +
							"  - Zone 8 Checked: " + this.z8 + "\n" +
							"  - Zone 9 Checked: " + this.z9 + "\n" +
							"  - Zone 10 Checked: " + this.z10 + "\n\n");
	this.navCtrl.pop();


}



}
