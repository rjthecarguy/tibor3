import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PicturePage} from '../../pages/picture-page/picture-page';
import { Report } from '../../providers/report'
import { Http } from '@angular/http';

/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;


@IonicPage()
@Component({
  selector: 'page-location-page',
  templateUrl: 'location-page.html',
})
export class LocationPage {


@ViewChild('map') mapElement: ElementRef;
  map: any;
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,public report:Report, public http:Http) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
 
     this.geolocation.getCurrentPosition().then((position) => {


     	this.report.lat = position.coords.latitude;
     	this.report.long = position.coords.longitude;

    
 
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.HYBRID
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: latLng
  });


     this.getWeather();

 
    }, (err) => {
      console.log(err);
    });

 
    

    
  }


  getWeather()  {


    var loc = this.report.lat + "," + this.report.long;

    console.log(loc);
    console.log(this.report.long);


    this.http.get('http://api.apixu.com/v1/current.json?key=c43696cc263744d4afe185513172705&q=' + loc).map(res => res.json()).subscribe(data => {
      
        console.log(data);

        this.report.feelsLike = data.current.feelslike_f;
        this.report.weatherLocation = data.location.name;
    });


  }



  openPicturePage() {
  	this.navCtrl.push(PicturePage);
  }

}
