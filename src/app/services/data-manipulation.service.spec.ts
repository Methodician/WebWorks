import { TestBed, inject } from '@angular/core/testing';

import { DataManipulationService } from './data-manipulation.service';

describe('DataManipulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataManipulationService]
    });
  });

  it('should ...', inject([DataManipulationService], (service: DataManipulationService) => {
    expect(service).toBeTruthy();
  }));
});
