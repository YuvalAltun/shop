import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BackendService } from '../services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLogedInGuard implements CanActivate {
  constructor(private backendService: BackendService, private toastrService: ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.backendService.isLogedIn().pipe(
      map(success =>  {
        return true;
      }),
      catchError(error => {
        this.toastrService.error('You must be loged in');
        return of(false);
      })
    );
  }

}
