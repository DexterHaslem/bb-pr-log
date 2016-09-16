import {HttpClient} from 'aurelia-http-client';


const API_URL = "http://expressive.tech/sprlog/sprlog.php";
const client = new HttpClient();

export class App {
  getRecent() {
    client.get(API_URL + "?action=getRecent")
      .then(data => {
        // warning: use data.content to format by content type!
        // response is raw content as a string
        console.log(data.content);
        this.recentLogs = data.content
      });
  }

  getAll() {
    return client.get(API_URL + "?action=getAll");
  }

  constructor() {
    this.recentLogs = [];
    this.message = 'Hello World!';
    this.getRecent();
  }
}
