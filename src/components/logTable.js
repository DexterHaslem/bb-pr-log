/**
 * Created by Dexter on 9/15/2016.
 */

import {bindable, inject, computedFrom} from "aurelia-framework";
import moment from "moment";
import {Api} from "../api";

// while this isnt technically needed, you can explicitly specify and
// avoid any surprises for camel/snake casing
//@customElement("log-table")
@inject(Api)
export class LogTable {

  @bindable title;

  @bindable logs;

  @bindable relativeTime;

  @bindable highlightId;

  constructor(api) {
    this.api = api;
  }

  toRelative(id, time) {

    if (id === this.highlightId) {
      return "(this action)";
    }

    const parsedInTime = moment(time);
    if (!this.momentRelativeTime) {
      this.momentRelativeTime = this.relativeTime ? moment(this.relativeTime) : moment();
    }

    const dif = parsedInTime.from(this.momentRelativeTime);
    return dif;
  }
}
