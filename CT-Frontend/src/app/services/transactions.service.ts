import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    constructor(private http: HttpClient, private url: AppService) {}
    getTransactions(data: any): Observable<any> {
        return this.http.post(this.url.API + '/transactions', data);
    }
}
