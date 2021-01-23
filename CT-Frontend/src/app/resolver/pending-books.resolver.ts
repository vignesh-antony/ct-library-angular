import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BorrowedBooksService } from '../borrowed-books/borrowed-books.service';

@Injectable({
    providedIn: 'root'
})
export class PendingBooksResolver implements Resolve<any> {

    constructor(private borrowService:BorrowedBooksService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.borrowService.getPendingBooks();
    }
}
