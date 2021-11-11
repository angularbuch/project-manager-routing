import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {LoginService} from './services/login-service/login-service';
import {Title} from '@angular/platform-browser';
import {AUTH_ENABLED} from './app.tokens';
import {filter} from 'rxjs/operators';
import {TaskService} from './shared/task-service/task.service';
import {Task} from './shared/models/model-interfaces';
import {AbstractCacheService} from './cache/abstract-cache.service';

@Component({
  selector: 'pjm-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  defaultTitle = '';

  numberInProgress = 0;

  constructor(@Optional() @Inject(AUTH_ENABLED) public authEnabled: boolean,
              public loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private taskService: TaskService,
              private cacheService: AbstractCacheService,
              private titleService: Title) {
  }


  ngOnInit() {
    this.cacheService.put('ANSWER', 42);
    this.defaultTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.setBrowserTitle();
      });

    this.taskService.tasks$.subscribe((tasks) => {
      this.numberInProgress = tasks.filter(
        (task: Task) => task.state === 'IN_PROGRESS').length;
    });

  }

  setBrowserTitle() {

    let title = this.defaultTitle;
    let route = this.activatedRoute;
    // firstChild gibt die Haupt-Kindroute der übergebenen Route zurück
    while (route.firstChild) {
      route = route.firstChild;
      title = route.snapshot.data['title'] || title;
    }
    this.titleService.setTitle(title);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
    return false;
  }


}

