import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { NavigationMenuModule } from './navigation-menu/navigation-menu.module';



@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    NavigationMenuModule
  ],
  exports: [
    NavigationBarComponent
  ]
})
export class NavigationBarModule { }
