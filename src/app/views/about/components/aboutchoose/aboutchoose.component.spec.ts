import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutchooseComponent } from './aboutchoose.component';

describe('AboutchooseComponent', () => {
  let component: AboutchooseComponent;
  let fixture: ComponentFixture<AboutchooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutchooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutchooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
