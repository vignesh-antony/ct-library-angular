import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    constructor(private http: HttpClient) {}
    getTransactions(data: any): Observable<any> {
        return this.http.post(environment.API + '/transactions', data);
    }
}
