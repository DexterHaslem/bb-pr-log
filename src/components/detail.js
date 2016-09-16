/**
 * Created by Dexter on 9/15/2016.
 */

import {bindable} from "aurelia-framework";

export class Detail {

  constructor() {

  }

  activate(params) {
    this.params = params;
    //console.log(params);
  }
}
