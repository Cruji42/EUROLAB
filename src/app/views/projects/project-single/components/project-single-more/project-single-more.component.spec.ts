import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSingleMoreComponent } from './project-single-more.component';

describe('ProjectSingleMoreComponent', () => {
  let component: ProjectSingleMoreComponent;
  let fixture: ComponentFixture<ProjectSingleMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSingleMoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSingleMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
