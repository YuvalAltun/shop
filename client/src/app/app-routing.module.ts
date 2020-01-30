import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { OrderComponent } from './pages/order/order.component';
import { AdminComponent } from './pages/admin/admin.component';
import { IsAdminInGuard } from './guards/isAdmin.guard';
import { IsLogedInGuard } from './guards/isLogedIn.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shopping', canActivate: [IsLogedInGuard], component: ShoppingComponent},
  {path: 'order', component: OrderComponent},
  {path: 'admin', canActivate: [IsAdminInGuard], component: AdminComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
