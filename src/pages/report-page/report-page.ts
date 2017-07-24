import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Report} from '../../providers/report'
import {TakePicture} from '../take-picture/take-picture'
import {ReportDetail} from '../report-detail/report-detail'
/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-page',
  templateUrl: 'report-page.html',
})
export class ReportPage {

reportText : any = "";
testRadioOpen = false;
  testRadioResult: any;
  testCheckboxOpen = false;
  testCheckboxResult: any;

  picImage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public report:Report) {

this.report.getLocation();


  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }


addText() {


	this.reportText += this.report.getDateTime();
	this.reportText += " - Arrived at scene \n\n";
}


inCustody() {


	this.reportText += this.report.getDateTime();
	this.reportText += " - Suspect In Custody \n\n";
}


postPerson(person){

	this.reportText += this.report.getDateTime();
	this.reportText += " - Person Recorded \n";
	this.reportText += "  - Last:" + person.lastName + "\n";
	this.reportText += "  - First:" + person.firstName + "\n";
	this.reportText += "  - Mid Init:" + person.middleInit + "\n";
	this.reportText += "  - DOB:" + person.dob + "\n\n";



}

reportInfo() {

this.navCtrl.push(ReportDetail);

}

closeReport() {


} 


getPerson() {


let alert = this.alertCtrl.create({
      title: 'Add Person',
      message: '',
      inputs: [
        {
          name: 'lastName',
          placeholder: 'Last Name'
        },
        {
          name: 'firstName',
          placeholder: 'First Name'
        },
        {
          name: 'middleInit',
          placeholder: 'Middle Initial'
        },
        {
          name: 'dob',
          placeholder: 'DOB'
        },
      ],
      buttons: [
        {
          text: 'Save Person - No Picture',
          handler: (data) => {
            console.log('No Pic clicked');
            console.log(data);
            this.postPerson(data);
          }
        },
        
        {
          text: 'Save Person with Picture',
          handler: (data) => {
            console.log('Saved clicked');
            this.navCtrl.push(TakePicture);
            this.postPerson(data);
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

leoAction() {

let alert = this.alertCtrl.create();
    alert.setTitle('LEO Action');

 alert.addInput({
      type: 'radio',
      label: 'LEO Notified',
      value: 'LEO Notified',
      checked: true
    });

  alert.addInput({
      type: 'radio',
      label: 'LEO En Route',
      value: 'LEO En Route',
      checked: false
    });

   alert.addInput({
      type: 'radio',
      label: 'LEO On Scene',
      value: 'LEO On Scene',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'LEO has Custody',
      value: 'LEO has Custody',
      checked: false
    });


      alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.reportText += this.report.getDateTime();
        this.reportText += " - " + data + "\n\n";
      }
    });

    alert.present();


}




callType() {

	let alert = this.alertCtrl.create();
    alert.setTitle('Report Type');

    alert.addInput({
      type: 'radio',
      label: 'Accident',
      value: 'Accident',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Alarm',
      value: 'Alarm'
    });

    alert.addInput({
      type: 'radio',
      label: 'Assault',
      value: 'Assault'
    });

     alert.addInput({
      type: 'radio',
      label: 'Suspicius Activity',
      value: 'Suspicious Activity'
    });

    alert.addInput({
      type: 'radio',
      label: 'Theft',
      value: 'Theft'
    });

    alert.addInput({
      type: 'radio',
      label: 'Traffic Stop',
      value: 'Traffic Stop'
    });

    alert.addInput({
      type: 'radio',
      label: 'Unknown',
      value: 'Unknown'
    });

   

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.report.reportTime = this.report.getDateTime();
        this.reportText = this.report.reportTime;
        this.reportText += " - " + data + " Reported\n\n";
        this.report.reportType = data;

      }
    });

    alert.present();
  }

 ionViewDidEnter() {

 	this.picImage = this.report.pic1;


 }
 

}
