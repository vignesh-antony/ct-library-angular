import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ManageBooksService {
    constructor(private http: HttpClient) {}

    addBook(data: any): Observable<any> {
        return this.http.post(environment.API + '/add-books', data);
    }
    updateBook(data: any): Observable<any> {
        return this.http.post(environment.API + '/update-books', data);
    }
    deleteBook(data: any): Observable<any> {
        return this.http.post(environment.API + '/delete-books', data);
    }
}
