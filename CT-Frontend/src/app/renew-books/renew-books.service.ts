import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RenewBooksService {

    constructor(private http: HttpClient) { }
    renewBooks(data:any): Observable<any>{
        return this.http.post("http://localhost:3000/renew-books",data);
    }
    returnBooks(data:any): Observable<any>{
        return this.http.post("http://localhost:3000/return-books",data);
    }
}
