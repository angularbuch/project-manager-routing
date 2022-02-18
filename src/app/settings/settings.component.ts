import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../services/login-service/login-service';


@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  originalTitle = '';

  readOnly = true;

  constructor(private activatedRoute: ActivatedRoute,
              private titleService: Title) {
    const user: User = activatedRoute.snapshot.data['user'];
    if (user.hasRight('change_settings')) {
      console.log('change allowed');
      this.readOnly = false;
    }
  }

  ngOnInit() {

    this.activatedRoute.data.subscribe((data) => {
      console.log(data); // Object {title: "Einstellungen"}
    });

    this.originalTitle = this.titleService.getTitle();
    const title = this.activatedRoute.snapshot.data['title'];
    if (title) {
      this.titleService.setTitle(title);
    }
  }
  ngOnDestroy() {
    this.titleService.setTitle(this.originalTitle);
  }

}
