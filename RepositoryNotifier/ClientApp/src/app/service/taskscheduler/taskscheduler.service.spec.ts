import { TestBed, inject } from "@angular/core/testing";

import { TaskschedulerService } from "./taskscheduler.service";

describe('TaskschedulerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskschedulerService]
    });
  });

  it('should be created', inject([TaskschedulerService], (service: TaskschedulerService) => {
    expect(service).toBeTruthy();
  }));
});
