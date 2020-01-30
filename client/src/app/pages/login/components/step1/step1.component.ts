import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  profileForm: FormGroup;
  @Output() isValid = new EventEmitter<boolean>();
  @Output() userData = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      id: ['', [Validators.required, Validators.max(999999999)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmed: ['', [Validators.required]],
    });

    this.profileForm.valueChanges.subscribe(val => {
      this.isValid.emit(false);
    });
  }

  next() {
    this.userData.emit(this.profileForm.value);
  }

}
