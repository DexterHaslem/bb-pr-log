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
    console.log("set log", logId);
    const findById = R.converge(
      R.find,
      [R.pipe(R.nthArg(0), R.propEq("id")), R.nthArg(1)]
    );
    const log = findById(logId, logs);
    this.relatedLogs = R.filter(l => l.payload.pullrequest.id === log.payload.pullrequest.id, logs);
    this.log = log;
  }

  // @computedFrom("log")
  // get relatedLogs() {
  //   console.log("get relatedLogs");
  //   return R.filter(l => l.payload.pullrequest.id === this.log.payload.pullrequest.id, this.api.allLogs || []);
  // }

  activate(params) {
    console.log("details activate: ", params);
    this.params = params;
    if (this.api.allLogs) {
      this.setLog(this.api.allLogs, params.id);
    } else {
      this.api.getAll().then(logs => this.setLog(this.api.allLogs, params.id));
    }
  }

  @computedFrom("log")
  get showGenericUpdate() {
    if (!this.log) {
      return false;
    }
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
