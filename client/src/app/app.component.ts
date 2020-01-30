import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import * as fromActions from './store/actions';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from './services/backend/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Guest';
  user$: Observable<User>;
  constructor(private store: Store<fromStore.State>, private router: Router) {

  }

  ngOnInit(): void {
    this.store.dispatch(new fromActions.LoadProducts({}));
    this.router.navigate(['/']);
    this.user$ = this.store.select(fromStore.getUser);
  }


}
