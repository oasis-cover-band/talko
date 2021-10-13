import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleNftPageComponent } from './view-single-nft-page.component';

describe('ViewSingleNftPageComponent', () => {
  let component: ViewSingleNftPageComponent;
  let fixture: ComponentFixture<ViewSingleNftPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleNftPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleNftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
