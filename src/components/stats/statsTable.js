/**
 * Created by Dexter on 9/18/2016.
 */
import {bindable} from "aurelia-framework";

export class StatsTable {

  @bindable allStats;

  @bindable title;

  @bindable user;

  @bindable actionFilter;

  constructor() {

  }

  rowItemClicked(row, field) {
    //console.log('rowItemClicked:', row.user, field);
    //this.user = row.user;
    this.user = row.user;
    if (field != 'user') {
      this.actionFilter = field;
    } else {
      // show me all actions for user
      this.actionFilter = null;
    }
  }
}
