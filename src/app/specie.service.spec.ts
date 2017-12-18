import { TestBed, inject } from '@angular/core/testing';

import { SpecieService } from './specie.service';

describe('SpecieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecieService]
    });
  });

  it('should be created', inject([SpecieService], (service: SpecieService) => {
    expect(service).toBeTruthy();
  }));
});
