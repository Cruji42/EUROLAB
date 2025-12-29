import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreServiceLeftComponent } from './more-service-left.component';

describe('MoreServiceLeftComponent', () => {
  let component: MoreServiceLeftComponent;
  let fixture: ComponentFixture<MoreServiceLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreServiceLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreServiceLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
