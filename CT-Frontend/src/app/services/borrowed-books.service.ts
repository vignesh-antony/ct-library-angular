import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root',
})
export class BorrowedBooksService {
    constructor(private http: HttpClient, private url: AppService) {}
    getBorrowedBooks(): Observable<any> {
        return this.http.get(this.url.API + '/borrowed-books/1');
    }
    getPendingBooks(): Observable<any> {
        return this.http.get(this.url.API + '/pending-books');
    }
}
