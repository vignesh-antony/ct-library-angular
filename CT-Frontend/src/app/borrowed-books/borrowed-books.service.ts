import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BorrowedBooksService {

    constructor(private http: HttpClient) { }
    getBorrowedBooks():Observable<any>{
        return this.http.get("http://localhost:3000/borrowed-books/1");
    }
    getPendingBooks():Observable<any>{
        return this.http.get("http://localhost:3000/pending-books");
    }
}
