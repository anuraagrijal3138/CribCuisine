import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostcuisinedetailsComponent } from './hostcuisinedetails.component';

describe('HostcuisinedetailsComponent', () => {
  let component: HostcuisinedetailsComponent;
  let fixture: ComponentFixture<HostcuisinedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostcuisinedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostcuisinedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
