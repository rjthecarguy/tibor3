import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Report} from '../../providers/report'

/**
 * Generated class for the VehicleInspection page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-vehicle-inspection',
  templateUrl: 'vehicle-inspection.html',
})
export class VehicleInspection {

miles : any;
fuel : any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public report: Report) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleInspection');
  }


  postVehicleInspection() {

  	this.report.postDateTime();
  	this.report.postEntry(" - Vehicle Inspection\n" + " - Mileage: " + this.miles +"\n" + " - Fuel: " + this.fuel + "%");
  	this.navCtrl.pop();


  }

}
