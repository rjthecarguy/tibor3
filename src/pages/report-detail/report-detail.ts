import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report';

/**
 * Generated class for the ReportDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-detail',
  templateUrl: 'report-detail.html',
})
export class ReportDetail {

	reportType : any;
	reportTime : any;

	reportLat : any;
	reportLong :any;

	reportFeelsLike:any;
	reportHumidity:any;
	reportPrecip:any;
	reportVis:any;
	reportWind: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public report:Report) {

  	this.reportType = this.report.reportType;
  	this.reportTime = this.report.reportTime;

  	this.reportLong = this.report.long;
  	this.reportLat = this.report.lat;



  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportDetail');
  }

  ionViewDidEnter() {

  	this.reportFeelsLike = this.report.feelsLike;
  	this.reportPrecip = this.report.precip_in;
  	this.reportVis = this.report.vis_miles;
  	this.reportWind = this.report.wind; 
  }

}
