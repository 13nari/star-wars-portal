import { TestBed, inject } from '@angular/core/testing';

import { StarshipService } from './starship.service';

describe('StarshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarshipService]
    });
  });

  it('should be created', inject([StarshipService], (service: StarshipService) => {
    expect(service).toBeTruthy();
  }));
});
