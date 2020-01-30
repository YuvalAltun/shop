import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromActions from './../../store/actions';
import { SignupData } from 'src/app/services/backend/backend.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  signupData: SignupData = {
    id: undefined,
    email: undefined,
    password: undefined,
    name: undefined,
    sureName: undefined,
    city: undefined,
    street: undefined
  };

  step1Valid = false;

  constructor(
    private store: Store<fromStore.State>,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    ) { }

  ngOnInit() {
    this.store.select(fromStore.getAuthInProcess).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(
      (inProcess) =>  {
        inProcess ? this.spinner.show() : this.spinner.hide();
      }
    );
  }



  stepOneChanged(isValid: boolean) {
    this.step1Valid = isValid;
  }
  stepOneCompleted(data: Step1) {
    Object.assign(this.signupData, data);
    // run test
    this.step1Valid = true;
  }
  stepTwoFinished(data: Step2) {
    const userData = Object.assign({}, this.signupData, data);
    this.store.dispatch(new fromActions.Signup(userData));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
   }
}

export interface Step1 {
  id: number;
  email: string;
  password: string;
  passwordConfirmed: string;
}

export interface Step2 {
  city: string;
  street: string;
  name: string;
  lastName: string;
}
