import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSingleCollectionPageComponent } from './view-single-collection-page.component';
import { CollectionItemModule } from '../collection-item/collection-item.module';



@NgModule({
  declarations: [
    ViewSingleCollectionPageComponent
  ],
  imports: [
    CommonModule,
    CollectionItemModule
  ],
  exports: [
    ViewSingleCollectionPageComponent
  ]
})
export class ViewSingleCollectionPageModule { }
