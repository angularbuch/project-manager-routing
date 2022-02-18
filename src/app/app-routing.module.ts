import {Routes, RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent, LoginGuard, UserResolver} from './login';
import {NotFoundComponent} from './not-found/not-found.component';
import {tasksRoutes, tasksComponents} from './tasks/tasks.routing';
import {ChatComponent} from './chat-component/chat.component';
import {RESOLVED_TOKEN} from './app.tokens';
import {NgModule} from '@angular/core';
import {ShowErrorComponent} from "./show-error/show-error.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CustomValidatorsModule} from "./models/custom-validators.module";

export function resolveToken(route: ActivatedRouteSnapshot,
                             state: RouterStateSnapshot) {
  return localStorage.getItem('token');
}

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, data: {title: 'Startseite'}}, // Dashboard unter /dashboard
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'settings', component: SettingsComponent,
    data: {
      title: 'Einstellungen'
    },
    resolve: {
      user: UserResolver,
      token: RESOLVED_TOKEN
    }
  },

  {path: 'about', component: AboutComponent, data: {title: 'Über uns'}},
  {path: 'login', component: LoginComponent},

  {path: 'chat', component: ChatComponent, outlet: 'bottom'},

  {path: 'tasks', canActivate: [LoginGuard], children: tasksRoutes},

  /** Redirect Konfigurationen **/
  {path: '**', component: NotFoundComponent}, // immer als letztes konfigurieren - erste Route die matched wird angesteuert
];

@NgModule({
  declarations: [DashboardComponent, SettingsComponent, AboutComponent, LoginComponent, ChatComponent, NotFoundComponent,
    ...tasksComponents],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes, {useHash: false}), CustomValidatorsModule],
  providers: [
    {provide: RESOLVED_TOKEN, useValue: resolveToken}
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

