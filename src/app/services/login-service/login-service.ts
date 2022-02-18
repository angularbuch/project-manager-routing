import {Inject, Injectable, Optional} from '@angular/core';
import {NEVER, Observable, of} from 'rxjs';
import {AUTH_ENABLED} from '../../app.tokens';

const CURRENT_USER = 'currentUser';

export class User {

  static create(data: any) {
    return new User(data.firstName, data.lastName, data.userName, data.password, data.rights);
  }

  constructor(public firstName: string,
              public lastName: string,
              public userName: string,
              public password: string,
              public rights: string[]) {
  }


  hasRight(right: string) {
    return this.rights.find(elem => elem === right) !== null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  USERS: User[] = [
    new User('John', 'Admin', 'admin', 'secret', ['edit_tasks', 'change_settings']),
    new User('Jane', 'User', 'user', 'secret', ['edit_tasks'])
  ];

  constructor(@Optional() @Inject(AUTH_ENABLED) private authEnabled = false) {
  }

  login(userName: string, password: string) {
    const [user] = this.USERS.filter(user_ => user_.userName === userName);
    if (user && user.password === password) {
      localStorage.setItem(CURRENT_USER, JSON.stringify(user));
      return true;
    }
    return false;
  }

  getCurrentUser(): Observable<User> {
    const userString = localStorage.getItem(CURRENT_USER);
    if (userString) {
      return of(User.create(JSON.parse(userString)));
    }
    return NEVER;
  }

  logout() {
    localStorage.removeItem(CURRENT_USER);
  }

  isLoggedIn() {
    return !this.authEnabled || localStorage.getItem(CURRENT_USER) != null;
  }

  getUser() {
    const userString = localStorage.getItem(CURRENT_USER);
    if (userString) {
      return JSON.parse(userString);
    }
  }

}

