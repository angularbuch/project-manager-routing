import {ViewChild, Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {NgForm} from '@angular/forms';
import {Task, createInitialTask} from '../../models/model-interfaces';
import {TaskService} from '../../services/task-service/task-service';
import {Subscription} from 'rxjs';
import * as model from '../../models/model-interfaces';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  providers: [TaskService]
})
export class EditTaskComponent implements OnInit {

  model = model;

  task: Task = createInitialTask();

  saved = false;

  @ViewChild(NgForm) form!: NgForm;

  constructor(
              private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router,
              private titleService: Title,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params['id'])
    )
    .subscribe(params => {
      this.task = this.taskService.getTask(params['id']);
    });

//   //Statische Alternative:
//    const id = this.route.snapshot.params['id'];
//    this.task = this.taskService.getTask(id);

  }

  addTag() {
    this.task.tags = this.task.tags || [];
    this.task.tags.push({label: ''});
    return false;
  }

  removeTag(i: number) {
    this.task.tags?.splice(i, 1);
    return false;
  }

  saveTask() {
    this.task = this.taskService.saveTask(this.task);
    this.saved = true;

    const url = this.router.parseUrl(this.router.url);
    console.log(url);
    const relativeUrl = this.router.url.includes('edit') ? '../..' : '..';
    this.router.navigate([relativeUrl], {relativeTo: this.route});
  }

  cancel() {
    this.location.back();
    return false;
  }

  canDeactivate(): boolean {
    if (this.saved || !this.form.dirty) {
      return true;
    }
    return window.confirm(`Ihr Formular besitzt ungespeicherte Änderungen, möchten Sie die Seite wirklich verlassen?`);
  }

}
