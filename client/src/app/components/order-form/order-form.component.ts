import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @Input() user: Observable<User>;
  profileForm = this.fb.group({
    creditCard: ['', [Validators.required]],
    shippingDate: [null, [Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
  });
  @Output() order = new EventEmitter<any>();
  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
  }

  submitForm() {
    this.order.emit(this.profileForm.value);
  }

}


