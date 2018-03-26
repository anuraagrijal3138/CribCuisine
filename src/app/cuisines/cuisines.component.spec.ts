import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinesComponent } from './cuisines.component';

describe('CuisinesComponent', () => {
  let component: CuisinesComponent;
  let fixture: ComponentFixture<CuisinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
