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
    deliveryDate: [null, [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
  });
  @Output() order = new EventEmitter<any>();
  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
  }

  submitForm() {
    const deliveryDate = this.profileForm.value.deliveryDate;
    this.order.emit({...this.profileForm.value, deliveryDate: `${deliveryDate.year}-${deliveryDate.month}-${deliveryDate.day}`});
  }

}


