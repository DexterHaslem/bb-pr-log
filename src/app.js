/**
 * Created by Dexter on 9/15/2016.
 */

export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'PR log';
    config.map([
      {route: ['', '/'], name: 'home', title: 'home', moduleId: 'components/home', nav: true},
      {route: 'detail/:id', name: 'detail', title: 'detail', moduleId: 'components/detail/detail', nav: false },
    ]);

    //config.mapUnknownRoutes('app');
  }

  constructor() {

  }
}
