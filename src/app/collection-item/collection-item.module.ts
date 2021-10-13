import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionItemComponent } from './collection-item.component';



@NgModule({
  declarations: [
    CollectionItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollectionItemComponent
  ]
})
export class CollectionItemModule { }
