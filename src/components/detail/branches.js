/**
 * Created by Dexter on 9/20/2016.
 */

import {bindable} from "aurelia-framework";

export class Branches {
  @bindable pullRequest = null;

  constructor() {

  }

  getBranchLink(branchName) {
    //https://bitbucket.org/ARASTAMPS/stamps
    console.log(this.pullRequest);
    return this.pullRequest ? `${this.pullRequest.source.repository.links.html.href}/branch/${branchName}` : '';
  }
}
