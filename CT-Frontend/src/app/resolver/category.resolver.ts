import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookCategoryService } from '../book-category/book-category.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryResolver implements Resolve<boolean> {
    constructor(private categService:BookCategoryService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.categService.getCategory();
    }
}
