import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TakePicture} from '../../pages/take-picture/take-picture';
import {GetImage} from '../../pages/get-image/get-image';

/**
 * Generated class for the PicturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-picture-page',
  templateUrl: 'picture-page.html',
})
export class PicturePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PicturePage');
  }

takePicturePage() {
	this.navCtrl.push(TakePicture);
}

selectImagePage() {
	this.navCtrl.push(GetImage);
}


}
