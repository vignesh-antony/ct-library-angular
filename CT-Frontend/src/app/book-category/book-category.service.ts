import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookCategoryService {

    constructor(private http:HttpClient) { }
    getCategory():Observable<any>{
        return this.http.get("http://localhost:3000/get-category");
    }
    getBookCategory():Observable<any>{
        return this.http.get("http://localhost:3000/book-category");
    }
    getBookBorrowCategory():Observable<any>{
        return this.http.get("http://localhost:3000/book-borrow-category");
    }
    setBookCategory(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/set-category",data);
    }
    updateBookCategory(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/update-category",data);
    }
    deleteBookCategory(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/delete-category",data);
    }
}
