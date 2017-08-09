import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';


/*
  Generated class for the DBData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DBData {


	db: any;
  	remote: string = 'http://74.208.165.188:5984/tibor2';

  constructor(public http: Http) {


this.db = new PouchDB('tibor2');

  	let options = {
          live: true,
          retry: true
        };
 
       this.db.sync(this.remote, options);

this.db.createIndex({     // Create index to get by ID
          index: {fields: ['_id']}
          })
       



 this.db.find({            // Get Log by ID
              selector: {
                        _id: {$eq:"1"} 
                         }
              }).then((data) => {

              

                  

              });




    console.log('Hello DBData Provider');
  }

}
