import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeDisplaySectionComponent } from './code-display-section.component';

describe('CodeDisplaySectionComponent', () => {
  let component: CodeDisplaySectionComponent;
  let fixture: ComponentFixture<CodeDisplaySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeDisplaySectionComponent]
    });
    fixture = TestBed.createComponent(CodeDisplaySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
