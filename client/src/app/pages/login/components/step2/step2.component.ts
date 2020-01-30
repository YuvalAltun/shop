import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  profileForm = this.fb.group({
    name: ['', [Validators.required]],
    sureName: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
  });
  @Output() finish = new EventEmitter<any>();
  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
  }

  submitForm() {
    this.finish.emit(this.profileForm.value);
  }

}
