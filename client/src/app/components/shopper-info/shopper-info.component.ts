import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-shopper-info',
  templateUrl: './shopper-info.component.html',
  styleUrls: ['./shopper-info.component.css']
})
export class ShopperInfoComponent implements OnInit {
  email: string;
  password: string;
  constructor(private _backendService: BackendService) { }

  ngOnInit() {
  }

  login() {
    this._backendService.login({email: this.email, password: this.password}).subscribe(
      success => {
        //store the user in the state
        // move into the shopping page
        alert('success');
      },
      error => alert(error.message)
    );
  }

  startShopping() {
    alert('not implemented yet');
  }

}
