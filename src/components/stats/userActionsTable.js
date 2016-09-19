/**
 * Created by Dexter on 9/18/2016.
 */
import {bindable, inject, computedFrom} from "aurelia-framework";
import {Stats} from "./stats";
import * as R from "ramda";
//import {Api} from "../../api";

//@inject(Api)
@inject(Stats)
export class UserActionsTable {

  //@bindable allStats;

  // we set ourselves @bindable title;

  @bindable user;

  @bindable actionFilter;

  constructor(stats) {
    //this.api = api;
    this.stats = stats;
  }

  @computedFrom("user", "actionFilter")
  get userActions() {

    //const overlaps = R.pipe(R.intersection, R.complement(R.isEmpty));

    const passesActionFilter = logItem => {

      const filter = this.prettyActionFilter.toLowerCase();
      console.log("filter = ", filter);
      if (!filter || filter == 'all') {
        return true;
      }

      // overlaps didnt work right here. hmm
      console.log("filter1");
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

    const byUser = log => {
      const passesFilter = passesActionFilter(log);
      console.log("passesActionFilter ", log, " =", passesFilter);
      return passesFilter && log.payload.actor.display_name == this.user;
    };

    // oops: beware this is full log item (log.payload..)
    return R.filter(byUser, this.stats.filteredLogs || []);
  }

  @computedFrom("actionFilter")
  get prettyActionFilter() {
    // lop 'num' off property name. really hacky
    return this.actionFilter ? this.actionFilter.substr(3) : 'All';
  }
}
