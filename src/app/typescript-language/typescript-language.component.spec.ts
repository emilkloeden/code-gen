import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptLanguageComponent } from './typescript-language.component';

describe('TypescriptLanguageComponent', () => {
  let component: TypescriptLanguageComponent;
  let fixture: ComponentFixture<TypescriptLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptLanguageComponent]
    });
    fixture = TestBed.createComponent(TypescriptLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
