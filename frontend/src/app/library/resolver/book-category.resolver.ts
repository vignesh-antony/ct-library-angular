import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookCategoryService } from '../services/book-category.service';

@Injectable({
    providedIn: 'root',
})
export class BookCategoryResolver implements Resolve<any> {
    constructor(private categService: BookCategoryService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.categService.getBookBorrowCategory();
    }
}
