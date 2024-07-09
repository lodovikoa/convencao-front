import { TestBed } from '@angular/core/testing';

import { ConvencaoService } from './convencao.service';

describe('ConvencaoService', () => {
  let service: ConvencaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvencaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
