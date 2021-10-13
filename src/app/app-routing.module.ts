import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageModule } from './landing-page/landing-page.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ViewCollectionsPageModule } from './view-collections-page/view-collections-page.module';
import { ViewCollectionsPageComponent } from './view-collections-page/view-collections-page.component';
import { ViewSingleCollectionPageModule } from './view-single-collection-page/view-single-collection-page.module';
import { ViewSingleCollectionPageComponent } from './view-single-collection-page/view-single-collection-page.component';
import { ViewSingleNftPageModule } from './view-single-nft-page/view-single-nft-page.module';
import { ViewSingleNftPageComponent } from './view-single-nft-page/view-single-nft-page.component';
import { ViewSingleAttributePageModule } from './view-single-attribute-page/view-single-attribute-page.module';
import { ViewSingleAttributePageComponent } from './view-single-attribute-page/view-single-attribute-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'view-collections', component: ViewCollectionsPageComponent},
  {path: 'view-single-collection/:collectionId', component: ViewSingleCollectionPageComponent},
  {path: 'view-single-nft/:collectionId/:nftId', component: ViewSingleNftPageComponent},
  {path: 'view-single-attribute/:collectionId/:attributeId', component: ViewSingleAttributePageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LandingPageModule,
    ViewCollectionsPageModule,
    ViewSingleCollectionPageModule,
    ViewSingleNftPageModule,
    ViewSingleAttributePageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
