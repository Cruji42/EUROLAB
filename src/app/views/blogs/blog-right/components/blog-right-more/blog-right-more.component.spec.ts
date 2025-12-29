import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRightMOreComponent } from './blog-right-more.component';

describe('BlogRightMOreComponent', () => {
  let component: BlogRightMOreComponent;
  let fixture: ComponentFixture<BlogRightMOreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogRightMOreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogRightMOreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
