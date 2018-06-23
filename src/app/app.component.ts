import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { LoadUser } from './store/actions';
import { Observable } from 'rxjs';
import { User } from './models/current-user.model';
import { selectCurrentUser } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventListing';
  public currentUser$: Observable<User>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new LoadUser());
    this.currentUser$ = store.select(selectCurrentUser);
  }
}
