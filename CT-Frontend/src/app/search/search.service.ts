import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private http:HttpClient) { }
    getBooks(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/book-list", data);
    }
    getStaffBook(){
        return this.http.get("http://localhost:3000/borrowed-books");
    }
}
