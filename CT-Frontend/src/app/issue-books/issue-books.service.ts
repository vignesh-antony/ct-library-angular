import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IssueBooksService {

    constructor(private http:HttpClient) { }
    issueBookToStaff(data:any):Observable<any>{
        return this.http.post("http://localhost:3000/issue-books", data);
    }
}
