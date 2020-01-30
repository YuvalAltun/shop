import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Output() category = new EventEmitter<string>();
  @Input() isAdmin = false;
  constructor() { }

  ngOnInit() {
  }

  addCategory(categoryName: string): void {
    this.category.emit(categoryName);
  }

  serachProduct(productName: string): void {
    this.search.emit(productName);
  }

}
