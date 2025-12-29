import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutValuesComponent } from './about-values.component';

describe('AboutValuesComponent', () => {
  let component: AboutValuesComponent;
  let fixture: ComponentFixture<AboutValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
