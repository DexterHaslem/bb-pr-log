/**
 * Created by Dexter on 9/15/2016.
 */

export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'PR log';
    config.map([
      {route: ['', '/'], name: 'home', title: 'Recent', moduleId: 'components/home', nav: true},
      {route: 'stats', name: 'stats', title: 'Stats', moduleId: 'components/stats/stats', nav: true },
      {route: 'detail/:id', href: 'detail', name: 'detail', title: 'Details', moduleId: 'components/detail/detail', nav: true, disabled: true},
    ]);

    config.mapUnknownRoutes('components/home');
  }

  constructor() {

  }

  disabledNav(navItem) {
    // this is solely to explicitly disable detail direct nav
    const ret =  navItem.href == 'detail' || navItem.isActive;
    return ret;
  }
}
