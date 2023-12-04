import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptLogoComponent } from './typescript-logo.component';

describe('TypescriptLogoComponent', () => {
  let component: TypescriptLogoComponent;
  let fixture: ComponentFixture<TypescriptLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptLogoComponent]
    });
    fixture = TestBed.createComponent(TypescriptLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
