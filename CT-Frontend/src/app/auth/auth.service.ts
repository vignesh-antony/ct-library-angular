import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}
    storeToken(data: any) {
        localStorage.setItem('ct-token', data.token);
    }
    getToken() {
        return localStorage.getItem('ct-token');
    }
    checkLoggedIn() {
        return !!localStorage.getItem('ct-token');
    }
}
