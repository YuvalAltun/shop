import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
@Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
