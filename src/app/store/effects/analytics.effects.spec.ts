import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AnalyticsEffects } from './analytics.effects';

describe('AnalyticsService', () => {
  let actions$: Observable<any>;
  let effects: AnalyticsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AnalyticsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
