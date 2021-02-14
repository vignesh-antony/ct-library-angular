import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root',
})
export class ManageBooksService {
    constructor(private http: HttpClient, private url: AppService) {}

    addBook(data: any): Observable<any> {
        return this.http.post(this.url.API + '/add-books', data);
    }
    updateBook(data: any): Observable<any> {
        return this.http.post(this.url.API + '/update-books', data);
    }
    deleteBook(data: any): Observable<any> {
        return this.http.post(this.url.API + '/delete-books', data);
    }
}
