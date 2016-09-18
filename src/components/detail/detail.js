/**
 * Created by Dexter on 9/15/2016.
 */

import {inject} from 'aurelia-framework';
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
    console.log(log);
    this.log = log;
    this.relatedLogs = R.filter(l => l.payload.pullrequest.id === log.payload.pullrequest.id, logs);
    //console.log(this.relatedLogs);
  }

  activate(params) {
    this.params = params;
    this.setLog(this.api.allLogs, params.id);
  }
}
