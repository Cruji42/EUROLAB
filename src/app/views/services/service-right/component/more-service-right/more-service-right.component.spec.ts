import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreServiceRightComponent } from './more-service-right.component';

describe('MoreServiceRightComponent', () => {
  let component: MoreServiceRightComponent;
  let fixture: ComponentFixture<MoreServiceRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreServiceRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreServiceRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
