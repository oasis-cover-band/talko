import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSingleAttributePageComponent } from './view-single-attribute-page.component';
import { AttributeItemModule } from '../attribute-item/attribute-item.module';



@NgModule({
  declarations: [
    ViewSingleAttributePageComponent
  ],
  imports: [
    CommonModule,
    AttributeItemModule
  ],
  exports: [
    ViewSingleAttributePageComponent
  ]
})
export class ViewSingleAttributePageModule { }
