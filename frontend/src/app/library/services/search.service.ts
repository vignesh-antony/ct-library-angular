import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private http: HttpClient) {}
    getBooks(data: any): Observable<any> {
        return this.http.post(environment.API + '/book-list', data);
    }
    getStaffBook(data: any): Observable<any> {
        return this.http.get(environment.API + '/borrowed-books/' + data);
    }
    getStaffList(): Observable<any> {
        return this.http.get(environment.API + '/staff-list');
    }
}
