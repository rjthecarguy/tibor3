import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

/*
  Generated class for the Report provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Report {



//Report Info

reportType: any;
reportTime: any;

// Location Information
lat:any;
long:any;



pic: any;
date:any;
text:any;

// Person Pic Info

pic1:any;
pic164: any;


// Weather Info
feelsLike:any;
weatherLocation:any;
humidity: any;
precip_in:any;
vis_miles:any;
wind:any;



  constructor(public geolocation: Geolocation, public http: Http) {
    console.log('Hello Report Provider');
  }


getWeather()  {


    var loc = this.lat + "," + this.long;

    

    this.http.get('http://api.apixu.com/v1/current.json?key=c43696cc263744d4afe185513172705&q=' + loc).map(res => res.json()).subscribe(data => {
      
      	console.log("Weather");
        console.log(data.current);

        this.feelsLike = data.current.feelslike_f;
        this.weatherLocation = data.location.name;
        this.precip_in = data.current.precip_in;
        this.precip_in = data.current.precip_in;
        this.vis_miles = data.current.vis_miles;
        this.wind = data.current.wind_mph;
    });


  }


getLocation() {

	this.geolocation.getCurrentPosition().then((position) => {

		this.lat = position.coords.latitude;
		this.long = position.coords.longitude;

		this.getWeather();



	});
}


  getDateTime () {

var todayDate = new Date().toLocaleDateString();
var todayTime = new Date().toLocaleTimeString();


	return todayDate + "\n" + todayTime; 


  }



}
