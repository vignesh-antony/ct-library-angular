import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private http: HttpClient, private url: AppService) {}
    getBooks(data: any): Observable<any> {
        return this.http.post(this.url.API + '/book-list', data);
    }
    getStaffBook(data: any): Observable<any> {
        return this.http.get(this.url.API + '/borrowed-books/' + data);
    }
    getStaffList(): Observable<any> {
        return this.http.get(this.url.API + '/staff-list');
    }
}
