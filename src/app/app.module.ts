import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileSaverModule } from 'ngx-filesaver';
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
    HttpClientModule,
    FileSaverModule,
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
