import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ActionSheet} from '../providers/action-sheet';
import { Events } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  isReports:boolean = false;

  pages: Array<{title: string, component: any}>;
  reports: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public actionMenu: ActionSheet, public events:Events) {
    this.initializeApp();


    this.events.subscribe('Menu:page', (pageName) => {
  // user and time are the same arguments passed in `events.publish(user, time)`
 
this.nav.push(pageName);
  
  

});


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
      
    ];

    this.reports = [
      { title: 'File a Report', component: HomePage },
      { title: 'My Reports', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  toggleReports ()
  {

  this.isReports = !this.isReports;

}

openAction() {
  this.actionMenu.openActionSheet();
}

menuClosed() {
  this.isReports = false;
}


}
