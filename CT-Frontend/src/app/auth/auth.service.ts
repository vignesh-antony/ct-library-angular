import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

export interface User {
    name: string;
    email: string;
    admin: boolean;
    logged: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    currentUser: Observable<User>;
    currentUserSubject: BehaviorSubject<User>;

    constructor() {
        this.currentUserSubject = new BehaviorSubject<User>({
            name: '',
            email: '',
            admin: false,
            logged: false,
        });
        this.currentUser = this.currentUserSubject.asObservable();
    }
    setCurrentUser(data: any) {
        try {
            let payload = jwt_decode(data);

            this.currentUserSubject.next({
                name: payload['user_name'],
                email: payload['user_email'],
                admin: payload['admin'],
                logged: true,
            });
        } catch (err) {
            return throwError('Invalid Token');
        }
    }
    storeToken(data: any) {
        localStorage.setItem('ct-token', data.token);
        this.setCurrentUser(data.token);
    }
    getToken() {
        return localStorage.getItem('ct-token');
    }
    deleteToken() {
        localStorage.removeItem('ct-token');
    }
    checkLoggedIn() {
        if (!!this.getToken()) {
            if (!this.currentUserSubject.value.logged) {
                this.setCurrentUser(this.getToken());
            }
            return true;
        } else return false;
    }
    logoutUser() {
        this.currentUserSubject.next({
            name: '',
            email: '',
            admin: false,
            logged: false,
        });
        this.deleteToken();
        location.reload();
    }
}
