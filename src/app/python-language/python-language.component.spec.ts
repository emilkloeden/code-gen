import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonLanguageComponent } from './python-language.component';

describe('PythonLanguageComponent', () => {
  let component: PythonLanguageComponent;
  let fixture: ComponentFixture<PythonLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PythonLanguageComponent]
    });
    fixture = TestBed.createComponent(PythonLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
