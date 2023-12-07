import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonLogoComponent } from './python-logo.component';

describe('PythonLogoComponent', () => {
  let component: PythonLogoComponent;
  let fixture: ComponentFixture<PythonLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PythonLogoComponent]
    });
    fixture = TestBed.createComponent(PythonLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
