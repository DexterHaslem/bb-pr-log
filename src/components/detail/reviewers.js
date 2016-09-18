/**
 * Created by Dexter on 9/18/2016.
 */

import {bindable, computedFrom} from "aurelia-framework";
import * as R from "ramda";

export class Reviewers {
  @bindable reviewers = [];

  constructor() {
  }

  @computedFrom("reviewers")
  get approvedCount() {
    return R.length(R.filter(R.propEq("approved", true), this.reviewers || []));
  }
  // @computedFrom('participants')
  // get reviewers() {
  //   return R.filter(R.propEq("role", "REVIEWER"), this.participants || []);
  // }
}
