import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCuisineComponent } from './post-cuisine.component';

describe('PostCuisineComponent', () => {
  let component: PostCuisineComponent;
  let fixture: ComponentFixture<PostCuisineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCuisineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
