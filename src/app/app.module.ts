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
import { DBData } from '../providers/db-data';
import { Camera } from '@ionic-native/camera';
import { TakePicture} from '../pages/take-picture/take-picture';
import { GetImage} from '../pages/get-image/get-image';
import { HttpModule } from '@angular/http';
import { ViewReports} from '../pages/view-reports/view-reports';
import { VehicleInspection} from '../pages/vehicle-inspection/vehicle-inspection';
import { Rounds} from '../pages/rounds/rounds';
import { Detection} from '../pages/detection/detection';
import { Leo } from '../pages/leo/leo';
import { Maint } from '../pages/maint/maint';

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
    ReportDetail,
    Detection,
    Rounds,
    Maint,
    Leo,
    VehicleInspection,
    ViewReports

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
    Rounds,
    VehicleInspection,
    ListPage,
    MapPage,
    Maint,
    PicturePage,
    Detection,
    TakePicture,
    Leo,
    GetImage,
    ReportDetail,
    ViewReports

  ],
  providers: [
    StatusBar,
    Camera,
    Report,
    SplashScreen,
    ActionSheet,
    DBData,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
