import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {ADD, EDIT, LOAD, REMOVE, TaskStore} from '../stores/index';
import {SOCKET_IO} from '../../app.tokens';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Task} from '../models/model-interfaces';
import {SharedModule} from '../shared-module';
import {ApplicationConfigService} from '../../services/application-config/application-config.service';

// const BASE_URL = `http://localhost:3000/api/tasks/`;

const WEB_SOCKET_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  socket: SocketIOClient.Socket;

  tasks$: Observable<Task[]>;

  tasksChanged = new BehaviorSubject({});

  private baseUrl: string;

  constructor(private http: HttpClient, private taskStore: TaskStore,
              private applicationConfigService: ApplicationConfigService,
              @Inject(SOCKET_IO) socketIO: any) {

    const appConfig = this.applicationConfigService.getApplicationConfig();
    this.baseUrl = `${appConfig.apiBaseUrl}/tasks`;
    this.socket = socketIO(appConfig.websocketUrl);
    this.tasks$ = taskStore.items$;
    fromEvent(this.socket, 'task_saved')
      .subscribe((action) => {
        this.taskStore.dispatch(action);
      });
  }

  findTasks(query = '', sort = 'id', order = 'ASC') {
    const searchParams = new HttpParams()
      .append('q', query)
      .append('_sort', sort)
      .append('_order', order);

    this.http.get<Task[]>(`${this.baseUrl}`, {params: searchParams}).pipe(
      tap((tasks) => {
        this.taskStore.dispatch({type: LOAD, data: tasks});
      })).subscribe();

    return this.tasks$;
  }

  getTask(id: number | string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }


  saveTask(task: Task): Observable<Task> {
    const method = task.id ? 'PUT' : 'POST';
    return this.http.request<Task>(method, `${this.baseUrl}/` + (task.id || ''), {
      body: task
    }).pipe(
      tap(savedTask => {
        this.tasksChanged.next(savedTask);
        const actionType = task.id ? EDIT : ADD;
        const action = {type: actionType, data: savedTask};
        this.taskStore.dispatch(action);
        this.socket.emit('broadcast_task', action);
      }));
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.baseUrl}/${task.id}`).pipe(
      tap(() => {
        this.taskStore.dispatch({type: REMOVE, data: task});
      }));
  }
}

