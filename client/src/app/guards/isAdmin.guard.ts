import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BackendService } from '../services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAdminInGuard implements CanActivate {
  constructor(private backendService: BackendService, private toastrService: ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return this.backendService.isLogedIn().pipe(
      map(success =>  true),
      catchError(error => {
        this.toastrService.error('You must be admin');
        return of(false);
      })
    );
  }

}
