import { TestBed } from '@angular/core/testing';

import { NumANomService } from './num-a-nom.service';

describe('NumANomService', () => {
  let service: NumANomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumANomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
