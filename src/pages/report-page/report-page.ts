import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Report} from '../../providers/report'
import {TakePicture} from '../take-picture/take-picture'
import {ReportDetail} from '../report-detail/report-detail'
import { HomePage } from '../home/home';
import {Observable} from 'rxjs/Observable';    


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

  myObservable : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public report:Report) {

//this.report.getLocation();


this.report.reportPageSubject.subscribe((reportData) => {

this.reportText = reportData.text;

console.log("OBSERVE");

});


this.myObservable = Observable.create(observer => {



});;


this.reportText = this.report.reportText;
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');


    this.myObservable.subscribe((data) => {

    });

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
this.report.reportText = this.reportText;

let alert = this.alertCtrl.create({
      title: 'Save Report?',
      message: '',
     
      buttons: [
        {
          text: 'Save',
          handler: (data) => {
            this.report.saveReport();
            this.navCtrl.setRoot(HomePage);
          
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


customEntry() {

let alert = this.alertCtrl.create({
      title: 'Custom Entry',
      message: '',
      inputs: [
        {
          name: 'customEntry',
          placeholder: 'Custom Entry'
        },
       
      ],
      buttons: [
        {
          text: 'Save',
          handler: (data) => {
          this.reportText += this.report.getDateTime();
          this.reportText += " - " + data.customEntry + "\n\n";
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



getEmpByLast4(data) {


//this.report.getByLast4(data);


console.log(this.report.verifyStaff(data));



}





onDuty() {

	let alert = this.alertCtrl.create({
      title: 'On Duty',
      message: 'Please Enter Last 4',
      inputs: [
        {
          name: 'last4',
          placeholder: 'Last 4 SSAN'
        },
       
      ],
      buttons: [
        {
          text: 'Go On Duty',
          handler: (data) => {
            console.log(data.last4);
          this.getEmpByLast4(data.last4);  
          
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

 ionViewDidEnter() {

 	this.picImage = this.report.pic1;


 }
 

}
