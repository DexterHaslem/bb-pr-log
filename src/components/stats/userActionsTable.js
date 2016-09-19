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

  @bindable title;

  @bindable user;

  @bindable actionFilter;

  constructor(stats) {
    //this.api = api;
    this.stats = stats;
  }

  @computedFrom("user")
  get userActions() {
    //console.log("get userActions:",this.stats.filteredLogs);
    const byUser = log => {
      // oops: beware this is full log item (log.payload..)
      //console.log(log);
      // TODO: actionFilter
      return log.payload.actor.display_name == this.user;
    };

    return R.filter(byUser, this.stats.filteredLogs || []);
    //console.log(this.logsByUser);
  }
}
