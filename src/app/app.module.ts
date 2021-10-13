import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarModule } from './search-bar/search-bar.module';
import { LogoModule } from './logo/logo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchBarModule,
    LogoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
