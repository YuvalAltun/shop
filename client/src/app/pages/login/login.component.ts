import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
step1Valid = false;
  constructor() { }

  ngOnInit() {
  }

  setIsStep1Valid(flag: boolean) {
    this.step1Valid = flag;
  }

}
