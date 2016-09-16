/**
 * Created by Dexter on 9/15/2016.
 */

import {customElement, bindable} from "aurelia-framework";

// while this isnt technically needed, you can explicitly specify and
// avoid any surprises for camel/snake casing
//@customElement("log-table")
export class LogTable {

  @bindable title;

  @bindable logs = [];

  constructor() {

  }

}
