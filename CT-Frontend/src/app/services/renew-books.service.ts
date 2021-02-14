import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root',
})
export class RenewBooksService {
    constructor(private http: HttpClient, private url: AppService) {}
    renewBooks(data: any): Observable<any> {
        return this.http.post(this.url.API + '/renew-books', data);
    }
    returnBooks(data: any): Observable<any> {
        return this.http.post(this.url.API + '/return-books', data);
    }
}
