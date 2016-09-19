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
    // log id came in a string for some reason. that was fun to find
    const logIdNum = parseInt(logId);
    const log = R.find(R.propEq('id', logIdNum), logs);
    this.relatedLogs = log ? R.filter(l => l.payload.pullrequest.id === log.payload.pullrequest.id, logs) : null;
    this.log = log;
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
