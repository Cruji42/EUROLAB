import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRightMoreComponent } from './project-right-more.component';

describe('ProjectRightMoreComponent', () => {
  let component: ProjectRightMoreComponent;
  let fixture: ComponentFixture<ProjectRightMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectRightMoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRightMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
