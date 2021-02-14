import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
    providedIn: 'root',
})
export class BookCategoryService {
    constructor(private http: HttpClient, private url: AppService) {}
    getCategory(): Observable<any> {
        return this.http.get(this.url.API + '/get-category');
    }
    getBookCategory(): Observable<any> {
        return this.http.get(this.url.API + '/book-category');
    }
    getBookBorrowCategory(): Observable<any> {
        return this.http.post(this.url.API + '/book-borrow-category', {});
    }
    setBookCategory(data: any): Observable<any> {
        return this.http.post(this.url.API + '/set-category', data);
    }
    updateBookCategory(data: any): Observable<any> {
        return this.http.post(this.url.API + '/update-category', data);
    }
    deleteBookCategory(data: any): Observable<any> {
        return this.http.post(this.url.API + '/delete-category', data);
    }
}
