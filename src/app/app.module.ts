import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarModule } from './search-bar/search-bar.module';
import { LogoModule } from './logo/logo.module';
import { UserInfoModule } from './user-info/user-info.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SearchBarModule,
    LogoModule,
    UserInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
