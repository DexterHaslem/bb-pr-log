/**
 * Created by Dexter on 9/15/2016.
 */
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';


@inject(HttpClient)
export class Home {
  constructor(http) {
    // http.configure(config => {
    //   config.useStandardConfiguration()
    //     .withBaseUrl("http://expressive.tech/sprlog/sprlog.php");
    // });
    // cant get base url to work for life of me
    this.http = http;
    this.getRecent();
    //console.log(http);
  }

  getRecent() {
    this.http.get("http://expressive.tech/sprlog/sprlog.php?action=getRecent")
      .then(data => {
        // warning: use data.content to format by content type!
        // response is raw content as a string
        this.recentLogs = data.content;
      });
  }

}
