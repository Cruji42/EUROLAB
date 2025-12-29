import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeftMoreComponent } from './project-left-more.component';

describe('ProjectLeftMoreComponent', () => {
  let component: ProjectLeftMoreComponent;
  let fixture: ComponentFixture<ProjectLeftMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectLeftMoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectLeftMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
