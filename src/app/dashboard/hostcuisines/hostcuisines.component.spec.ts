import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostcuisinesComponent } from './hostcuisines.component';

describe('HostcuisinesComponent', () => {
  let component: HostcuisinesComponent;
  let fixture: ComponentFixture<HostcuisinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostcuisinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostcuisinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
