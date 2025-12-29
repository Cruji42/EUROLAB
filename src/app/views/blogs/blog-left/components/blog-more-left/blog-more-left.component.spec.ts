import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMoreLEftComponent } from './blog-more-left.component';

describe('BlogMoreLEftComponent', () => {
  let component: BlogMoreLEftComponent;
  let fixture: ComponentFixture<BlogMoreLEftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogMoreLEftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogMoreLEftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
