import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineFormComponent } from './cuisine-form.component';

describe('CuisineFormComponent', () => {
  let component: CuisineFormComponent;
  let fixture: ComponentFixture<CuisineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
