import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringLanguageComponent } from './spring-language.component';

describe('SpringLanguageComponent', () => {
  let component: SpringLanguageComponent;
  let fixture: ComponentFixture<SpringLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpringLanguageComponent]
    });
    fixture = TestBed.createComponent(SpringLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
