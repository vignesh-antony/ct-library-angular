import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IssueBooksService {
    constructor(private http: HttpClient) {}
    issueBookToStaff(data: any): Observable<any> {
        return this.http.post(environment.API + '/issue-books', data);
    }
}
