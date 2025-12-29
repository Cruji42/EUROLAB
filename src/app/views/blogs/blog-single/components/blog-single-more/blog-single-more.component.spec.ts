import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSingleMOreComponent } from './blog-single-more.component';

describe('BlogSingleMOreComponent', () => {
  let component: BlogSingleMOreComponent;
  let fixture: ComponentFixture<BlogSingleMOreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSingleMOreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSingleMOreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
