import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringLogoComponent } from './spring-logo.component';

describe('SpringLogoComponent', () => {
  let component: SpringLogoComponent;
  let fixture: ComponentFixture<SpringLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpringLogoComponent]
    });
    fixture = TestBed.createComponent(SpringLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
