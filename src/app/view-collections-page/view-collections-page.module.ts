import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCollectionsPageComponent } from './view-collections-page.component';
import { CollectionItemModule } from '../collection-item/collection-item.module';



@NgModule({
  declarations: [
    ViewCollectionsPageComponent
  ],
  imports: [
    CommonModule,
    CollectionItemModule
  ],
  exports: [
    ViewCollectionsPageComponent
  ]
})
export class ViewCollectionsPageModule { }
