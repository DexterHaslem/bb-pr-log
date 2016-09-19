/**
 * Created by Dexter on 9/18/2016.
 */
import {inject, computedFrom, bindable} from 'aurelia-framework';
import {Api} from '../../api';
import * as R from 'ramda';
import moment from "moment";

const TIMEPERIOD_DAY = 'day';
const TIMEPERIOD_WEEK = 'week';
const TIMEPERIOD_MONTH = 'month';
const TIMEPERIOD_ALL = 'all';

@inject(Api)
export class Stats {

  constructor(api) {
    this.api = api;
    this.stats = null;
    this.timePeriods = [TIMEPERIOD_DAY, TIMEPERIOD_WEEK, TIMEPERIOD_MONTH, TIMEPERIOD_ALL];
    this.selectedTimePeriod = TIMEPERIOD_WEEK;
  }

  // make sure to handle being bookmarked here
  activate() {
    if (!this.api.allLogs) {
      // our computed from will take care of the rest
      this.api.getAll();
    }
  }

  clearFilter() {
    //console.log("clearUser");
    this.user = null;
    this.actionFilter = null;
  }

  calculateRowsFrom(logs, timePeriod) {
    // can happen on initial load, dont blow up ramda with it
    if (!logs) {
      return [];
    }
    //console.log("stats.calculateFrom:", timePeriod);
    let cutoff = null;
    switch (timePeriod) {
      case TIMEPERIOD_DAY:    cutoff = moment().subtract(1, 'days');    break;
      case TIMEPERIOD_WEEK:   cutoff = moment().subtract(1, 'weeks');   break;
      case TIMEPERIOD_MONTH:  cutoff = moment().subtract(1, 'months');  break;
    }

    this.timePeriodString = cutoff ? cutoff.from(moment()) + " to now" : '(all)';
    this.filteredLogs = cutoff ? R.filter(l => moment(l.time).isAfter(cutoff), logs) : logs;
    //console.log(filteredLogs);

    // map out the data by user before turning into rows
    this.usersData = {};

    this.filteredLogs.forEach(l => {
      const user = l.payload.actor.display_name;
      if (!this.usersData[user]) {
        this.usersData[user] = {
          numApproved: 0,
          numComments: 0,
          numMerges: 0,
          numRejected: 0,
          numCreated: 0,
        };
      }

      const target = this.usersData[user];
      switch (l.type) {
        case "pullrequest:fulfilled":         target.numMerges++; break;
        case "pullrequest:rejected":          target.numRejected++; break;
        case "pullrequest:approved":          target.numApproved++; break;
        case "pullrequest:unapproved":        target.numApproved--; break;
        //case "pullrequest:updated":           target.numMerges++; break;
        case "pullrequest:comment_created":   target.numComments++; break;
        //case "pullrequest:comment_updated":   target.numMerges++; break;
        case "pullrequest:comment_deleted":   target.numComments--; break;
        case "pullrequest:created":           target.numCreated++; break;
      }
    });

    // simply stick our user name in the object too
    const toRow = key => R.merge(this.usersData[key], {user: key});
    const ret = R.map(toRow, R.keys(this.usersData));
    //console.log(ret);
    return ret;
  }

  @computedFrom("api.allLogs", "selectedTimePeriod")
  get allStats() {
    //console.log("get allStats");
    this.stats = {};
    this.stats.columns = [{
      title: "User",
      field: "user"
    }, {
      title: "# created",
      field: "numCreated"
    },
    {
      title: "# Approved",
      field: "numApproved"
    },
    {
      title: "# Comments",
      field: "numComments"
    },
    {
      title: "# Merges",
      field: "numMerges"
    },
    {
      title: "# Rejected",
      field: "numRejected"
    }];
    //console.log(this.api);
    this.stats.rows = this.calculateRowsFrom(this.api.allLogs, this.selectedTimePeriod);
    return this.stats;
  }

}
