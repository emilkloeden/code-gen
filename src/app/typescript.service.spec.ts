import { TestBed } from '@angular/core/testing';

import { TypescriptService } from './typescript.service';

describe('TypescriptService', () => {
  let service: TypescriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypescriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
