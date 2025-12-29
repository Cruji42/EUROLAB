import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleServiceSidebarComponent } from './single-service-sidebar.component';

describe('SingleServiceSidebarComponent', () => {
  let component: SingleServiceSidebarComponent;
  let fixture: ComponentFixture<SingleServiceSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleServiceSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleServiceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
