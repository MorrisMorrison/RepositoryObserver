import { TestBed, inject } from "@angular/core/testing";

import { GithubauthService } from "./githubauth.service";

describe('GithubauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubauthService]
    });
  });

  it('should be created', inject([GithubauthService], (service: GithubauthService) => {
    expect(service).toBeTruthy();
  }));
});
