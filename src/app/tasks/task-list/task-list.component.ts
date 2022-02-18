import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {FormControl} from '@angular/forms';
import {Task} from '../../models/model-interfaces';
import {TaskService} from '../../services/task-service/task-service';
import {Router, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {

  selectedTaskId: string | number | null = null;

  tasks!: Task[];

  searchTerm = new FormControl();

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      const query = decodeURI(params['query'] ?? '');
      this.searchTerm.setValue(query);
      this.tasks = this.taskService.findTasks(query);
    });

    this.route.fragment.subscribe((fragment) => {
      if (!fragment) { return; }
      const [key, value] = fragment.split('=');
      if (key === 'select' && value !== undefined) {
        this.selectTask(value);
      }
    });


    // Alternative Umsetzung auf Basis von Matrix-Parametern
    /*
     this.route.params.subscribe((params) => {
     const query = decodeURI(params['query'] || '');
     this.searchTerm.setValue(query);
     this.tasks = this.taskService.findTasks(query);
     });
     */

    // Statisches Auslesen von Parametern über Snapshots
    /*
    const query = this.route.snapshot.queryParams['query'];
    this.tasks = this.taskService.findTasks(query);

    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      const [key, value] = fragment.split('=');
      if (key === 'select' && value !== undefined) {
        this.selectTask(value);
      }
    }
     */
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
    this.findTasks(this.searchTerm.value);
  }

  selectTask(taskId: string) {
    this.selectedTaskId = taskId;

    this.router.navigate([ {outlets: {'right': [ 'overview' , taskId]}}], {
      relativeTo: this.route
    });
  }

  findTasks(queryString: string) {
    this.tasks = this.taskService.findTasks(queryString);
    this.adjustBrowserUrl(queryString);
  }

  adjustBrowserUrl(queryString = '') {
    const absoluteUrl = this.location.path().split('?')[0];
    const queryPart = queryString !== '' ? `query=${queryString}` : '';

    this.location.replaceState(absoluteUrl, queryPart);
  }

}
