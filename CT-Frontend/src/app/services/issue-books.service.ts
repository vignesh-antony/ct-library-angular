import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root',
})
export class IssueBooksService {
    constructor(private http: HttpClient, private url: AppService) {}
    issueBookToStaff(data: any): Observable<any> {
        return this.http.post(this.url.API + '/issue-books', data);
    }
}
