import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {tasksRouting, tasksRoutingComponents} from './tasks.routing';
import {SharedModule} from '../shared/shared-module';
import {SuperSecretCalculationService} from '../super-secret-calculation.service';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule, tasksRouting],
  declarations: [tasksRoutingComponents],
  providers: [SuperSecretCalculationService]
})
export class TasksModule {
}
