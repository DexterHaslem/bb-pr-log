/**
 * Created by Dexter on 9/18/2016.
 */
import {inject, computedFrom} from 'aurelia-framework';
import {Api} from '../../api';
import * as R from 'ramda';

@inject(Api)
export class Stats {
  constructor(api) {
    this.api = api;
    this.stats = null;
  }

  @computedFrom("api")
  get allStats() {
    console.log("get allStats");
    if (this.stats) {
      return this.stats;
    }

    this.stats = {};
    this.stats.columns = [{
      title: "title1",
      field: "col1"
    }, {
      title: "title2",
      field: "col2"
    },
    {
      title: "title3",
      field: "col3"
    }];
    this.stats.rows = [{
      col1: "foo",
      col2: "bar",
      col3: "baz",
    }];
    return this.stats;
  }
}
