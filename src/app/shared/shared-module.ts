import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowErrorComponent } from './show-error/show-error.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomValidatorsModule } from './custom-validators/custom-validators.module';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [ShowErrorComponent],
  exports: [CommonModule, FormsModule, HttpClientModule, CustomValidatorsModule,
    ShowErrorComponent]
})
export class SharedModule {
}
