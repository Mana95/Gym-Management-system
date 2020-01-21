import { TestBed } from '@angular/core/testing';

import { PasswordresetService } from './passwordreset.service';

describe('PasswordresetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordresetService = TestBed.get(PasswordresetService);
    expect(service).toBeTruthy();
  });
});
