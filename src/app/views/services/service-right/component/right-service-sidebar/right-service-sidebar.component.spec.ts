import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightServiceSidebarComponent } from './right-service-sidebar.component';

describe('RightServiceSidebarComponent', () => {
  let component: RightServiceSidebarComponent;
  let fixture: ComponentFixture<RightServiceSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightServiceSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightServiceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
