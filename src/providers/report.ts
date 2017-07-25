import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';


/*
  Generated class for the Report provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Report {

reportSubject: any = new Subject();  
db: any;
  remote: string = 'http://74.208.165.188:5984/tibor2';

//Report Info

reportType: any;
reportTime: any;
reportText:any;

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



  constructor(public geolocation: Geolocation, public http: Http, public zone: NgZone) {

this.db = new PouchDB('tibor2');
 
        let options = {
          live: true,
          retry: true
        };
 
       this.db.sync(this.remote, options);


       this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
           if(change.doc.type === 'report'){
                this.emitReports();
          }
        });


    console.log('Hello Report Provider');
  }


saveReport() {
var reportID = new Date().toISOString();
var reportText = this.reportText;
var reportType = this.reportType;
var reportTime = this.reportTime;
var reportLat = this.lat;
var reportLong = this.long;
var reportTemp = this.feelsLike;
var reportRain = this.precip_in;
var reportVis = this.vis_miles;
var reportWind = this.wind;
var docType = "report";
var pic = 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAIAAAB0Xu9BAAAABGdBTUEAALGPC/xhBQAAAuNJREFUWEetmD1WHDEQhDdxRMYlnBFyBIccgdQhKVcgJeQMpE5JSTd2uqnvIGpVUqmm9TPrffD0eLMzUn+qVnXPwiFd/PP6eLh47v7EaazbmxsOxjhTT88z9hV7GoNF1cUCvN7TTPv/gf/+uQPm862MWTL6fff4HfDx4S79/oVAlAUwqOmYR0rnazuFnhfOy/ErMKkcBFOr1vOjUi2MFn4nuMil6OPh5eGANLhW3y6u3aH7ijEDCxgCvzFmimvc95TekZLyMSeJC68Bkw0kqUy1K87FlpGZqsGFCyqEtQNDdFUtFctTiuhnPKNysid/WFEFLE2O102XJdEE+8IgeuGsjeJyGHm/xHvQ3JtKVsGGp85g9rK6xMHtvHO9+WACYjk5vkVM6XQ6OZubCJvTfPicYPeHO2AKFl5NuF5UK1VDUbeLxh2BcRGKTQE3irHm3+vPj6cfCod50Eqv5QxtwBQUGhZhbrGVuRia1B4MNp6edwBxld2sl1splfHCwfsvCZfrCQyWmX10djjOlWJSSy3VQlS6LmfrgNvaieRWx1LZ6s9co+P0DLsy3OdLU3lWRclQsVcHJBcUQ0k9/WVVrmpRzYQzpgAdQcAXxZzUnFX3proannrYH+Vq6KkLi+UkarH09mC8YPr2RMWOlEqFkQClsykGEv7CqCUbXcG8+SaGvJ4a8d4y6epND+pEhxoN0vWUu5ntXlFb5/JT7JfJJqoTdy9u9qc7ax3xJRHqJLADWEl23cFWl4K9fvoaCJ2BHpmJ3s3z+O0U/DmzdMjB9alWZtg4e3yxzPa7lUR7nkvxLHO9+tvJX3mtSDpwX8GajB283I8R8a7D2MhUZr1iNWdny256yYLd52DwRYBtRMvE7rsmtxIUE+zLKQCDO4jlxB6CZ8M17GhuY+XTE8vNhQiIiSE82ZsGwk1pht4ZSpT0YVpon6EvevOXXH8JxVR78QzNuamupW/7UB7wO/+7sG5V4ekXb4cL5Lyv+4IAAAAASUVORK5CYII=';

this.db.put (



    {
    _id : reportID,
    type: docType,
    reportType: reportType,
    reportTime:reportTime,
    reportLat: reportLat,
    reportLong: reportLong,
    reportTemp: reportTemp,
    reportRain: reportRain,
    reportVis: reportVis,
    reportWind: reportWind,
    reportText: reportText,
    _attachments: {
      'person.png': {
        content_type: 'image/png',
        data: pic
      }
    }

    }

  );

}



emitReports() {

  this.zone.run(() => {

          
 
            this.db.query('reports/byType').then((data) => {
 
                let Players = data.rows.map(row => {
                    return row.value;
                });
 
                this.reportSubject.next(Players);
 
            });
 
        });
 




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
