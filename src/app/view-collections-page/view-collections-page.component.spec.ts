import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollectionsPageComponent } from './view-collections-page.component';

describe('ViewCollectionsPageComponent', () => {
  let component: ViewCollectionsPageComponent;
  let fixture: ComponentFixture<ViewCollectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCollectionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCollectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
