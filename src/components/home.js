/**
 * Created by Dexter on 9/15/2016.
 */
import {inject} from 'aurelia-framework';
import {Api} from "../api";

@inject(Api)
export class Home {
  constructor(api) {
    this.api = api;
    console.log("home constructor");
    api.getAll();
  }
}
