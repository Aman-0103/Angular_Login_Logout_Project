import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { myrouteguardGuard } from './myrouteguard.guard';

describe('myrouteguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => myrouteguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
