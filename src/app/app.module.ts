import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import {AUTH_ENABLED} from './app.tokens';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    imports: [BrowserModule, AppRoutingModule],
    providers: [
        Title,
        { provide: AUTH_ENABLED, useValue: true }
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
