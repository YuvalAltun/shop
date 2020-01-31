import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product, Category, Cart } from 'src/app/services/backend/backend.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromActions from './../../store/actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingComponent implements OnInit, AfterViewInit {
  @ViewChild('content', {static: false}) private content;
  @ViewChild('main', {static: false}) private main;
  @ViewChild('mySidebar', {static: false}) private mySidebar;
  @ViewChild('toggleButton', {static: false}) private toggleButton;
  currentProduct: Product;
  profileForm: FormGroup;
  $products: Observable<Product[]>;
  $categories: Observable<Category[]>;
  $cart: Observable<Cart>;
  cart: Cart;
  searchFlag = {status: false};
  closeResult: string;
  opened: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.State>,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private router: Router) { }

  ngOnInit() {

    this.profileForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]]
    });



    this.$categories = this.store.select(fromStore.getCategories);
    this.$products = this.store.select(fromStore.getProducts);
    this.$cart = this.store.select(fromStore.getCart).pipe(
      map(cart => {
        const totalPrice = cart && cart.items && cart.items.length ? cart.items.reduce((acc, cur) => acc += cur.amount * cur.price, 0) : 0;
        return {...cart, totalPrice};
      })
    );


  }

  ngAfterViewInit(): void {
    this.toggleSidebar();
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.handleItem();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  removeItem(item) {
    this.store.dispatch(new fromActions.RemoveCartItem(item.id));
  }

  handleItem() {
    this.store.dispatch(new fromActions.AddCartItem(
      {price: this.currentProduct.price, products_id: this.currentProduct.id, amount: this.profileForm.value.amount}))
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  toggleSidebar() {
    if (this.opened) {
      this.renderer.setStyle(this.mySidebar.nativeElement, 'width', '0');
      this.renderer.setStyle(this.main.nativeElement, 'margin-left', '0');

    } else {
      this.renderer.setStyle(this.mySidebar.nativeElement, 'width', '400px');
      this.renderer.setStyle(this.main.nativeElement, 'margin-left', '400px');
    }
    this.opened = !this.opened;
  }
  addCategory(name: string) {
    this.store.dispatch(new fromActions.AddCategories(name));
  }

  moveToOrder() {
    this.router.navigate(['/order'])
  }

  chooseProduct(product: Product) {
    this.currentProduct = product;
    this.open(this.content);
  }


  filterProducts(category: Category): void {
    this.store.dispatch(new fromActions.LoadProducts({category: category.id}));
  }

  searchProducts(productName: string | void) {
    this.searchFlag = {status: true};
    this.store.dispatch(new fromActions.LoadProducts({name: productName}));
  }
}
