import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOverlayComponent } from './error-overlay.component';

describe('ErrorOverlayComponent', () => {
  let component: ErrorOverlayComponent;
  let fixture: ComponentFixture<ErrorOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorOverlayComponent]
    });
    fixture = TestBed.createComponent(ErrorOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
