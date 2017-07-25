import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report';

/**
 * Generated class for the ViewReports page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-reports',
  templateUrl: 'view-reports.html',
})
export class ViewReports {

reportRecord:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public report:Report) {
  }

  ionViewDidLoad() {

  	this.report.getReports().subscribe((Report) => {
 		this.reportRecord = Report;

 		console.log("report below");
 		console.log(Report);

 		});

    console.log('ionViewDidLoad ViewReports');
    console.log(this.reportRecord);

}
  

}
