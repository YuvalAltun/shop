import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { OrderComponent } from './pages/order/order.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ShopperInfoComponent } from './components/shopper-info/shopper-info.component';
import { ShopperStatusComponent } from './components/shopper-status/shopper-status.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { Step1Component } from './pages/login/components/step1/step1.component';
import { Step2Component } from './pages/login/components/step2/step2.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ShoppingComponent,
    OrderComponent,
    AdminComponent,
    ShopperInfoComponent,
    ShopperStatusComponent,
    StoreInfoComponent,
    Step1Component,
    Step2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
