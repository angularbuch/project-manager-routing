import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent, LoginGuard} from './login/index';
import {NotFoundComponent} from './not-found/not-found.component';
// import {TasksModule} from './tasks/tasks.module';

//function loadTasksModule() {
// return TasksModule;
//}

export const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, data: {title: 'Startseite'}},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'settings', component: SettingsComponent, data: {title: 'Einstellungen'},
  },
  {path: 'about', component: AboutComponent, data: {title: 'Über uns'}},
  {path: 'login', component: LoginComponent},


  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule),
    canLoad: [LoginGuard]
  },
  // {path: 'tasks', loadChildren: loadTasksModule, canLoad: [LoginGuard]},

  /** Redirect Konfigurationen **/
  {path: 'tasks/*', redirectTo: '/tasks'},
  {path: '404', component: NotFoundComponent},

  {path: '**', redirectTo: '/404'}, // immer als letztes konfigurieren - erste Route die matched wird angesteuert
];

export const appRouting = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules
});

export const routingComponents = [DashboardComponent, SettingsComponent, AboutComponent, LoginComponent, NotFoundComponent];
