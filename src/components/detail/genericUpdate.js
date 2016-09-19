/**
 * Created by Dexter on 9/18/2016.
 */

import {bindable, inject, computedFrom} from "aurelia-framework";
import {Api} from "../../api";

// for pull request create/update/rejects

@inject(Api)
export class GenericUpdate {
  @bindable log = null;

  constructor(api) {
    this.api = api;
  }

  @computedFrom("log")
  get headerText() {
    return this.api.prettyAction(this.log.type) + " by";
  }

  @computedFrom("log")
  get statusText() {
    return this.log.payload.pullrequest.updated_on;
  }

  @computedFrom("log")
  get commentText() {
    const reason = this.log.payload.pullrequest.reason;
    return reason ? "Reason: " + reason : null;
  }
}
