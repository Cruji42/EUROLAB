import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamArea3Component } from './team-area3.component';

describe('TeamArea3Component', () => {
  let component: TeamArea3Component;
  let fixture: ComponentFixture<TeamArea3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamArea3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamArea3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
