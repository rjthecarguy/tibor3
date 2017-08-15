import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import { Subject } from 'rxjs/Subject';
import {DBData} from '../providers/db-data';
import PouchDBFind from 'pouchdb-find';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
PouchDB.plugin(PouchDBFind);
import {ReportPage} from '../pages/report-page/report-page'

/*
  Generated class for the Report provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Report {

reportOpen: any = false;


reportData =   {"_id": "",
                "_rev": "",
               "last4":"",
               "type":"",
               "text":"",
               "name":"",
               "status":""};





reportRecord:any;

reportSubject: any = new Subject();  
personSubject: any = new Subject();
reportPageSubject : any = new Subject();


//Report Info

reportType: any;
reportTime: any;
reportText:any = "";
reportPerson:any;
reportLast4:any;

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



  constructor(public geolocation: Geolocation, public http: Http, public zone: NgZone, public DBdata:DBData, public alertCtrl: AlertController) {





   

this.DBdata.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
           if(change.doc.type === 'report'){
                this.emitReports();
          }
        });

        


    console.log('Hello Report Provider');
  }



getRevision(logID)  {

this.DBdata.db.find({            // Get Log by ID
              selector: {
                        _id: {$eq:logID} 
                         }
              }).then((data) => {

              

                  
                  
                   this.reportData._rev = data.docs[0]._rev;
                  
                   this.reportPageSubject.next(this.reportData);  // post subject to subscribers

                     

              });


}


closeReport() {

this.reportData.status = "closed"
this.DBdata.db.put(this.reportData);

} 


loadLog (logID)  {

    console.log("LOAD LOG");
    console.log(logID);

      this.DBdata.db.createIndex({     // Create index to get by ID
          index: {fields: ['_id']}
          })


          this.DBdata.db.find({            // Get Log by ID
              selector: {
                        _id: {$eq:logID} 
                         }
              }).then((data) => {

              

                   this.reportData._id = logID; 
                   this .reportData.text =  data.docs[0].text; // get data to local record
                   this.reportData._rev = data.docs[0]._rev;
                   this.reportData.status = "open";
                   this.reportData.type = "report";

                   this.reportPageSubject.next(this.reportData);  // post subject to subscribers

                   this.reportOpen = true;  

              });



}



newLog () {


        console.log("NEW LOG");

          this.reportData._id = new Date().toISOString();

         this.reportData.text = this.getDateTime();
         this.reportData.type = "report";
         this.reportData.status = "open";


         this.reportData.text += " - " + this.reportData.name + " On Duty" + "\n\n";

         console.log(this.reportData.text);

         this.DBdata.db.put(

           {_id : this.reportData._id,
             type: "report",
             status: "open",
             text: this.reportData.text,
             name: this.reportData.name,
             last4: this.reportData.last4}

           );

         this.loadLog(this.reportData._id);

         
         this.reportPageSubject.next(this.reportData);
          


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

this.DBdata.db.put (



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


 getReports() {


    this.emitReports();

    return this.reportSubject;



  }



verifyStaff(last4) : any {

  this.DBdata.db.createIndex({
  index: {fields: ['type',"last4","status"]}
})


this.DBdata.db.find({
  selector: {
    last4: {$eq:last4},
    type: {$eq:"staff"} 
   }
      }).then((data) => {

            if(data.docs.length == 0)   // Staff not foud by last 4
                return false;

              else  // Staff found by last 4
                {



                  this.reportData.last4 = data.docs[0].last4;      // move Staff data to local var
                  this.reportData.name = data.docs[0].staffName;

                    this.DBdata.db.find({    // find open report
                        selector:

                        {
                        last4: {$eq:last4},
                        type: {$eq:"report"},
                        status: {$eq:"open"} 
                        }  

                          }).then((data) => {
                                    if(data.docs.length !=0)  // Open log found
                                        {
                                         this.logOpenMessage();   
                                        this.loadLog(data.docs[0]._id); //load existing log
                                        }  
                                                else  this.newLog();

                              });




                } // end of 'yes' Else Statemant



      });



}


postEntry(entry) {

console.log(this.reportData);


this.reportData.text += entry;
this.reportPageSubject.next(this.reportData);
this.DBdata.db.put(this.reportData);

this.getRevision(this.reportData._id);



}



getByLast4(last4) {


   this.zone.run(() => {





this.DBdata.db.createIndex({
  index: {fields: ['last4']}
})

 this.DBdata.db.find({
  selector: {
    last4: {$eq:last4} 
     
  }
}).then((data) => {


if(data.docs.length == 0)
    return;
      else
        {
          this.reportPerson = data.docs[0].name;
          this.reportLast4 = data.docs[0].last4;
          console.log(this.reportPerson);
          console.log(this.reportLast4);
          

          this.openTest();

        }   
      

          // this.reportSubject.next(Reports);

                  });   // <
      

}); // << Zone End
 


} 

openTest() {


  this.DBdata.db.createIndex({
  index: {fields: ['last4','type','status']}
})


var last4 = this.reportLast4;

 this.DBdata.db.find({
  selector: {
     last4:  {$eq:last4},
     type: {$eq:"report"},
     status: {$eq:"open"} 
     
  }
}).then((data) => {

  if (data.docs.length == 0)
      console.log("Create New Log");
    this.newLog();
  
});




  console.log(this.reportPerson);
}



emitReports(): void {

  this.zone.run(() => {

          

this.DBdata.db.createIndex({
  index: {fields: ['type']}
})

 this.DBdata.db.find({
  selector: {
    type: 'report'
    
  }
}).then((data) => {



     let Reports = data.docs.map(row => {
                  return row;
                          });

           this.reportSubject.next(Reports);

                  });   // << Promise End 


          
        }); // << Zone End
 




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



logOpenMessage() {
let alert = this.alertCtrl.create({
      title: 'Log Open',
      message: 'Your log is open.  You can to add entries to this log.  To close this log, go "Off Duty"  ',
     
      buttons: [
            
       
        {
          text: 'OK',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });

    alert.present();

}


reportWarning() {


let alert = this.alertCtrl.create({
      title: 'No Log Open',
      message: 'Please Go On Duty',
     
      buttons: [
            
       
        {
          text: 'OK',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });

    alert.present();

}


getLocation() {

	this.geolocation.getCurrentPosition().then((position) => {

		this.lat = position.coords.latitude;
		this.long = position.coords.longitude;

		this.getWeather();



	});
}


postDateTime() {

  this.reportData.text += this.getDateTime();

  console.log(this.reportData.text);

  this.reportPageSubject.next(this.reportData);
}


  getDateTime () {

var todayDate = new Date().toLocaleDateString();
var todayTime = new Date().toLocaleTimeString();


	return todayDate + "\n" + todayTime + "\n"; 


  }



}
