import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSingleSidebarComponent } from './project-single-sidebar.component';

describe('ProjectSingleSidebarComponent', () => {
  let component: ProjectSingleSidebarComponent;
  let fixture: ComponentFixture<ProjectSingleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSingleSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSingleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
