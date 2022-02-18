import {Component, Inject, Optional, OnInit} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import {LoginService} from './services/login-service/login-service';
import {Title} from '@angular/platform-browser';
import {AUTH_ENABLED} from './app.tokens';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'pjm-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  defaultTitle = '';

  settingsPageActive = false;

  constructor(@Optional() @Inject(AUTH_ENABLED) public authEnabled: boolean,
              public loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private titleService: Title) {
  }

  ngOnInit() {
    this.defaultTitle = this.titleService.getTitle();
    this.router.events.pipe(
      tap(console.log),
      filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.setBrowserTitle();
      });
  }

  setBrowserTitle() {
    let title = this.defaultTitle;
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
      title = route.snapshot.data['title'] ?? title;
    }
    this.titleService.setTitle(title);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
    return false;
  }

  toggleChat() {
    if (!this.router.url.includes('chat')) {
      this.router.navigate([ {outlets: {'bottom': [ 'chat']}}]);
    } else {
      this.router.navigate([ {outlets: {'bottom': null}}]);
    }
  }

}

