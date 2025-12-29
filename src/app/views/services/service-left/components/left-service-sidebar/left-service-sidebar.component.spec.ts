import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftServiceSidebarComponent } from './left-service-sidebar.component';

describe('LeftServiceSidebarComponent', () => {
  let component: LeftServiceSidebarComponent;
  let fixture: ComponentFixture<LeftServiceSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftServiceSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftServiceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
