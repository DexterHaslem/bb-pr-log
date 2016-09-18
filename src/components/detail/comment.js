/**
 * Created by Dexter on 9/18/2016.
 */

import {bindable} from "aurelia-framework";

export class Comment {
  @bindable log = null;

  constructor() {

  }

  prettyAction(action){
    const chunks = action.split("_");
    return chunks[chunks.length-1];
  }
}
