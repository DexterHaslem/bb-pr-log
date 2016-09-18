/**
 * Created by Dexter on 9/18/2016.
 */
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import * as R from 'ramda';

const BASE_URL= "http://expressive.tech/sprlog/sprlog.php?";
const RECENT_COUNT = 15;

@inject(HttpClient)
export class Api {
  constructor(http) {
    this.http = http;
  }

  resetCache() {
    this.recentLogs = null;
    this.allLogs = null;
  }

  getAll() {
    return this.allLogs ? Promise.resolve(this.allLogs) :
      this.http.get(BASE_URL + "action=getAll")
        .then(data => {
          this.allLogs = data.content.logs;
          this.recentLogs = R.take(RECENT_COUNT, data.content.logs);
        });
  }
}
