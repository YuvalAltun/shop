import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item } from 'src/app/services/backend/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  @Output() deleteRow = new EventEmitter<Item>();
  @Input() cart;
  @Input() isEditable = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  orderClick() {
    this.router.navigate(['/order']);
  }

  shopingClick() {
    this.router.navigate(['/shopping']);
  }

  removeItem(item: Item){
    this.deleteRow.emit(item);
  }

}
