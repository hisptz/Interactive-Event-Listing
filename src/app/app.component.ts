import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { LoadUser } from './store/actions';
import { Observable, interval } from 'rxjs';
import { User } from './models/current-user.model';
import { selectCurrentUser, selectAnalytics, selectAnalyticsLoading, selectAnalyticsLoaded } from './store';
import { Analytics } from './models/analytics.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventListing';
  public currentUser$: Observable<User>;
  public analytics$: Observable<Analytics>;
  public isAnalyticsLoading$: Observable<boolean>;
  public isAnalyticsLoaded$: Observable<boolean>;
  public downloadExcel: boolean;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new LoadUser());
    this.currentUser$ = store.select(selectCurrentUser);
    this.analytics$ = store.select(selectAnalytics);
    this.isAnalyticsLoading$ = store.select(selectAnalyticsLoading);
    this.isAnalyticsLoaded$ = store.select(selectAnalyticsLoaded);
  }

  onDownloadClicked(event) {
    const { download } = event;
    this.downloadExcel = download;
    interval(10)
      .pipe(take(1))
      .subscribe(() => (this.downloadExcel = false));
  }
}
