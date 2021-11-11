import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ApplicationConfig} from './application-config';

@Injectable({providedIn: 'root'})
export class ApplicationConfigService {
  private applicationConfig!: ApplicationConfig;

  constructor(private http: HttpClient) {
  }

  loadConfig() {
    return this.http.get<ApplicationConfig>('/assets/config/config.json').pipe(
      tap(config => this.applicationConfig = config),
    );
  }

  getApplicationConfig(): ApplicationConfig {
    return {...this.applicationConfig};
  }
}
