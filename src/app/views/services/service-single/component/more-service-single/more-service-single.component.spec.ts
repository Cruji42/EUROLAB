import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreServiceSingleComponent } from './more-service-single.component';

describe('MoreServiceSingleComponent', () => {
  let component: MoreServiceSingleComponent;
  let fixture: ComponentFixture<MoreServiceSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreServiceSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreServiceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
