import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  profileForm: FormGroup;
  @Output() isValid = new EventEmitter<boolean>();
  constructor(public loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      id: ['', [Validators.required]],
      email: ['', [Validators.required,  Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmed: ['', [Validators.required]],
    });
  }

  next() {
    this.loginService.setLoginData(this.profileForm.value);
    this.isValid.emit(true);
  }

}
