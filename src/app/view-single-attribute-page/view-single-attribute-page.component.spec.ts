import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleAttributePageComponent } from './view-single-attribute-page.component';

describe('ViewSingleAttributePageComponent', () => {
  let component: ViewSingleAttributePageComponent;
  let fixture: ComponentFixture<ViewSingleAttributePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleAttributePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleAttributePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
