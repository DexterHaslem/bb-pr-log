/**
 * Created by Dexter on 9/18/2016.
 */
import {bindable, inject, computedFrom} from "aurelia-framework";
import {Stats} from "./stats";
import * as R from "ramda";
//import {Api} from "../../api";

//@inject(Api)
@inject(Stats)
export class FilteredActionsTable {

  //@bindable allStats;

  // we set ourselves @bindable title;

  @bindable user;

  @bindable actionFilter;

  @bindable timePeriodString;

  constructor(stats) {
    //this.api = api;
    this.stats = stats;
  }

  // woo you can put anything in parent controllers that changes too
  @computedFrom("user", "actionFilter", "stats.selectedTimePeriod")
  get filteredLogs() {
    //console.log('get filteredLogs');

    const passesActionFilter = logItem => {

      const filter = this.prettyActionFilter.toLowerCase();
      //console.log("filter = ", filter);
      if (!filter || filter == 'all') {
        return true;
      }

      // overlaps didnt work right here. hmm
      //console.log("filter1");
      switch (logItem.type) {
        case "pullrequest:created":
          return filter === "created";
        case "pullrequest:approved":
        case "pullrequest:unapproved":
          return filter === "approved";
        case "pullrequest:fulfilled":
          return filter === "merges";
        case "pullrequest:comment_created":
        case "pullrequest:comment_updated":
        case "pullrequest:comment_deleted":
          return filter == "comments";
        case "pullrequest:rejected":
          return filter == "rejected";
        default: return false;
      }
    };
    const passesUserFilter =  logItem =>  {
      return !this.user || logItem.payload.actor.display_name == this.user;
    };

    const byUser = log => passesActionFilter(log) && passesUserFilter(log);

    // oops: beware this is full log item (log.payload..)
    return R.filter(byUser, this.stats.filteredLogs || []);
  }

  @computedFrom("user")
  get userString() {
    return this.user != null ? "for " + this.user : "for all users";
  }

  @computedFrom("actionFilter")
  get prettyActionFilter() {
    // lop 'num' off property name. really hacky
    return this.actionFilter ? this.actionFilter.substr(3) : 'All';
  }
}
