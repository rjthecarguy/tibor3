import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map-page/map-page';
import { ListPage } from '../pages/list/list';
import { PicturePage } from '../pages/picture-page/picture-page';
import { ActionSheet } from '../providers/action-sheet';
import { Report } from '../providers/report';
import { Camera } from '@ionic-native/camera';
import { TakePicture} from '../pages/take-picture/take-picture';
import { GetImage} from '../pages/get-image/get-image';
import { HttpModule } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { ReportDetail } from '../pages/report-detail/report-detail';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    PicturePage,
    TakePicture,
    GetImage,
    ReportDetail

    ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    PicturePage,
    TakePicture,
    GetImage,
    ReportDetail

  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    ActionSheet,
    Report,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
