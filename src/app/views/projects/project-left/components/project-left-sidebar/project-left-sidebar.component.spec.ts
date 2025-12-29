import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeftSidebarComponent } from './project-left-sidebar.component';

describe('ProjectLeftSidebarComponent', () => {
  let component: ProjectLeftSidebarComponent;
  let fixture: ComponentFixture<ProjectLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectLeftSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
