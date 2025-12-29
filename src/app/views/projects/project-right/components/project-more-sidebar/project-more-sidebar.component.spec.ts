import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMoreSidebarComponent } from './project-more-sidebar.component';

describe('ProjectMoreSidebarComponent', () => {
  let component: ProjectMoreSidebarComponent;
  let fixture: ComponentFixture<ProjectMoreSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMoreSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMoreSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
