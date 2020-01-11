import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
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
  constructor(
    public loginService: LoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.loginService.setLoginData(this.profileForm.value);
    this.loginService.submit().subscribe(
      success => this.router.navigate(['/']),
      error => alert(error)
    );
  }

}
