import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleTextComponent } from './circle-text.component';

describe('CircleTextComponent', () => {
  let component: CircleTextComponent;
  let fixture: ComponentFixture<CircleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
