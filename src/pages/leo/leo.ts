import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report'

/**
 * Generated class for the Leo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-leo',
  templateUrl: 'leo.html',
})
export class Leo {

leoAction: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public report: Report) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Leo');
  }



  postLeo() {


  	this.report.postDateTime();
	this.report.postEntry(" - " + this.leoAction + "\n\n");
	this.navCtrl.pop();
  }

}
