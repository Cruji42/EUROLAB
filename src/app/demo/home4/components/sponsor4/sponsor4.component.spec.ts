import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sponsor4Component } from './sponsor4.component';

describe('Sponsor4Component', () => {
  let component: Sponsor4Component;
  let fixture: ComponentFixture<Sponsor4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sponsor4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sponsor4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
