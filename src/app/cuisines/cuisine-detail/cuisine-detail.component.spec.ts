import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineDetailComponent } from './cuisine-detail.component';

describe('CuisineDetailComponent', () => {
  let component: CuisineDetailComponent;
  let fixture: ComponentFixture<CuisineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
