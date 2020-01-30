import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product, Category } from 'src/app/services/backend/backend.service';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromActions from './../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  faPlus = faPlus;
  editFlag = true;
  currentProduct: Product;
  profileForm: FormGroup;
  $products: Observable<Product[]>;
  $categories: Observable<Category[]>;
  searchFlag = {status: false};

  constructor(private fb: FormBuilder, private store: Store<fromStore.State>) { }

  ngOnInit() {
    // TODO: Remove
    this.store.dispatch(new fromActions.LoadProducts({}));
    this.store.dispatch(new fromActions.LoadCategories());

    this.profileForm = this.fb.group({
      id: [{ value: 0 }, [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      categories_id: [1, [Validators.required]],
      image: ['', [Validators.required]]
    });
    this.newProduct();
    this.$categories = this.store.select(fromStore.getCategories);
    this.$products = this.store.select(fromStore.getProducts);


  }



  addCategory(name: string) {
    this.store.dispatch(new fromActions.AddCategories(name));
  }

  chooseProduct(product: Product) {
    this.editFlag = true;
    this.currentProduct = product;
    this.profileForm.patchValue(this.currentProduct);
  }

  newProduct() {
    this.editFlag = false;
    this.currentProduct = { id: -1, name: '', price: 0, categories_id: 1, image: '' };
    this.profileForm.patchValue(this.currentProduct);
  }

  save() {
    if (this.editFlag) {
      this.store.dispatch(new fromActions.EditProducts(this.profileForm.value));
    } else {
      this.store.dispatch(new fromActions.AddProducts(this.profileForm.value));
    }
  }

  filterProducts(category: Category): void {
    this.store.dispatch(new fromActions.LoadProducts({category: category.id}));
  }

  searchProducts(productName: string | void) {
    this.searchFlag = {status: true};
    this.store.dispatch(new fromActions.LoadProducts({name: productName}));
  }

}
