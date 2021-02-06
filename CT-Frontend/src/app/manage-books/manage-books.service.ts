import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ManageBooksService {

    constructor(private http:HttpClient) { }
    
    addBook(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/add-books",data);
    }
    updateBook(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/update-books",data);
    }
    deleteBook(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/delete-books",data);
    }
}
