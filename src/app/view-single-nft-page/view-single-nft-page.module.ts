import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSingleNftPageComponent } from './view-single-nft-page.component';
import { NftItemModule } from '../nft-item/nft-item.module';



@NgModule({
  declarations: [
    ViewSingleNftPageComponent
  ],
  imports: [
    CommonModule,
    NftItemModule
  ],
  exports: [
    ViewSingleNftPageComponent
  ]
})
export class ViewSingleNftPageModule { }
