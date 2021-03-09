import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BookCategoryService {
    constructor(private http: HttpClient) {}
    getCategory(): Observable<any> {
        return this.http.get(environment.API + '/get-category');
    }
    getBookCategory(): Observable<any> {
        return this.http.get(environment.API + '/book-category');
    }
    getBookBorrowCategory(): Observable<any> {
        return this.http.post(environment.API + '/book-borrow-category', {});
    }
    setBookCategory(data: any): Observable<any> {
        return this.http.post(environment.API + '/set-category', data);
    }
    updateBookCategory(data: any): Observable<any> {
        return this.http.post(environment.API + '/update-category', data);
    }
    deleteBookCategory(data: any): Observable<any> {
        return this.http.post(environment.API + '/delete-category', data);
    }
}
