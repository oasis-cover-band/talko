import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleCollectionPageComponent } from './view-single-collection-page.component';

describe('ViewSingleCollectionPageComponent', () => {
  let component: ViewSingleCollectionPageComponent;
  let fixture: ComponentFixture<ViewSingleCollectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleCollectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleCollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
