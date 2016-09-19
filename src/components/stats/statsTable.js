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

  userClicked(row) {
    console.log('user clicked:', row.user);
    this.user = row.user;
  }
}
