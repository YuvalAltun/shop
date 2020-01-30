import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from 'src/app/services/backend/backend.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.css']
})
export class ButtonFilterComponent implements OnInit {
  @Input() categories: Category[] = [];
  currentCategory: Category;
  @Input() searchFlag = {status: false};
  @Output() filterEvent = new EventEmitter<Category>();
  constructor() { }

  ngOnInit() {
    console.log(this.categories)
  }

  filter(category: Category): void {
    this.currentCategory = category;
    this.searchFlag = {status: false};
    this.filterEvent.emit(category);
  }
}
