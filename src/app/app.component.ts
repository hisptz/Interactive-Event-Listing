import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { LoadUser } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventListing';

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new LoadUser());
  }
}
