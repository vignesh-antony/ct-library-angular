import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BorrowedBooksService {
    constructor(private http: HttpClient) {}
    getBorrowedBooks(): Observable<any> {
        return this.http.get(environment.API + '/borrowed-books');
    }
    getPendingBooks(): Observable<any> {
        return this.http.get(environment.API + '/pending-books');
    }
}
