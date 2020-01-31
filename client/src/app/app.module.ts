import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { OrderComponent } from './pages/order/order.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ShopperInfoComponent } from './pages/home/components/shopper-info/shopper-info.component';
import { ShopperStatusComponent } from './pages/home/components/shopper-status/shopper-status.component';
import { StoreInfoComponent } from './pages/home/components/store-info/store-info.component';
import { Step1Component } from './pages/login/components/step1/step1.component';
import { Step2Component } from './pages/login/components/step2/step2.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers, effects } from './store/index';
import { NgxSpinnerModule } from 'ngx-spinner';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ButtonFilterComponent } from './components/button-filter/button-filter.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OrderViewComponent } from './pages/order-view/order-view.component';



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
    Step2Component,
    SearchBarComponent,
    ButtonFilterComponent,
    ProductsContainerComponent,
    ItemsListComponent,
    OrderFormComponent,
    NavBarComponent,
    OrderViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    SidebarModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  exports: [ShoppingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
