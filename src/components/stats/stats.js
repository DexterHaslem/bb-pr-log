/**
 * Created by Dexter on 9/18/2016.
 */
import {inject} from 'aurelia-framework';
import {Api} from '../../api';
import * as R from 'ramda';

@inject(Api)
export class Stats {
  constructor(api) {
    this.api = api;
  }
}
