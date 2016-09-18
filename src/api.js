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

  prettyAction(dbaction){
    switch (dbaction){
      case "pullrequest:fulfilled":         return "Merged";
      case "pullrequest:rejected":          return "Rejected";
      case "pullrequest:approved":          return "Approval added";
      case "pullrequest:unapproved":        return "Approval removed";
      case "pullrequest:updated":           return "Updated";
      case "pullrequest:comment_created":   return "Comment added";
      case "pullrequest:comment_updated":   return "Comment updated";
      case "pullrequest:comment_deleted":   return "Comment deleted";
      case "pullrequest:created":           return "Created";
      // TODO: check tasks
      default:                              return dbaction;
    }
  }
}
