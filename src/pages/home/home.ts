import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { ActionSheet} from '../../providers/action-sheet'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public actionMenu: ActionSheet) {


  }

  openSheet() {

  	this.actionMenu.openActionSheet();

  }





}
