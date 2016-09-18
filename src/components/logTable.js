/**
 * Created by Dexter on 9/15/2016.
 */

import {bindable} from "aurelia-framework";
import moment from "moment";

// while this isnt technically needed, you can explicitly specify and
// avoid any surprises for camel/snake casing
//@customElement("log-table")
export class LogTable {

  @bindable title;

  @bindable logs = [];

  @bindable relativeTime = null;

  @bindable highlightId;

  constructor() {

  }

  prettyDbAction(dbaction){
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

  toRelative(id, time) {
    if (id === this.highlightId) {
      return "(this action)";
    }

    if (!this.relativeTime) {
      return time;
    } else {
      const parsedInTime = moment(time);
      if (!this.momentRelativeTime) {
        this.momentRelativeTime = moment(this.relativeTime);
      }

      const dif = parsedInTime.from(this.momentRelativeTime);
      return dif;
    }
  }
}
