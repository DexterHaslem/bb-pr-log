/**
 * Created by Dexter on 9/15/2016.
 */

import {inject, computedFrom} from 'aurelia-framework';
import {Api} from '../../api';
import * as R from 'ramda';

@inject(Api)
export class Detail {

  constructor(api) {
    this.api = api;
  }

  setLog(logs, logId) {
    //console.log("set log", logs);
    const findById = R.converge(
      R.find,
      [R.pipe(R.nthArg(0), R.propEq("id")), R.nthArg(1)]
    );
    const log = findById(logId, logs);//logs.find(l => l.id === logId);
    this.log = log;
    this.relatedLogs = R.filter(l => l.payload.pullrequest.id === log.payload.pullrequest.id, logs);
    //console.log(this.relatedLogs);
  }

  activate(params) {
    this.params = params;
    if (this.api.allLogs) {
      this.setLog(this.api.allLogs, params.id);
    } else {
      this.api.getAll().then(logs => this.setLog(this.api.allLogs, params.id));
    }
  }

  @computedFrom("log")
  get showGenericUpdate() {
    console.log("showGenericUpdate");
    if (!this.log) {
      return false;
    }
    console.log(this.log.type);
    switch (this.log.type) {
      case "pullrequest:updated":
      case "pullrequest:fulfilled":
      case "pullrequest:created":
      case "pullrequest:rejected":
        return true;
      default: return false;
    }
  }
}
