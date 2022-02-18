import {Routes} from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {EditTaskGuard} from './edit-task/edit-task.guard';
import {TaskOverviewComponent} from './task-overview/task-overview.component';
import {TasksComponent} from './tasks.component';
import {TaskItemComponent} from './task-item/task-item.component';
import {ShowErrorComponent} from "../show-error/show-error.component";

export const tasksRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: TaskListComponent,
        data: {title: 'Task-Übersicht'}
      },
      {
        path: 'edit/:id', component: EditTaskComponent,
        data: {title: 'Aufgabe bearbeiten'},
        canDeactivate: [EditTaskGuard]
      },
      {
        path: 'new', component: EditTaskComponent,
        data: {title: 'Neue Aufgabe anlegen'},
        canDeactivate: [EditTaskGuard]
      },

      {path: 'e/:id', redirectTo: 'edit/:id'},
      {path: '**', redirectTo: ''},
    ]
  }, {
    path: 'overview/:id',
    component: TaskOverviewComponent,
    outlet: 'right'
  },
];

export const tasksComponents = [TasksComponent, TaskListComponent, TaskItemComponent, EditTaskComponent, TaskOverviewComponent, ShowErrorComponent];

