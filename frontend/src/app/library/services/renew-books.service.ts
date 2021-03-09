import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RenewBooksService {
    constructor(private http: HttpClient) {}
    renewBooks(data: any): Observable<any> {
        return this.http.post(environment.API + '/renew-books', data);
    }
    returnBooks(data: any): Observable<any> {
        return this.http.post(environment.API + '/return-books', data);
    }
}
