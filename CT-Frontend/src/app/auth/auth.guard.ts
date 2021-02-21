import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private route: Router) {}
    canActivate(): boolean {
        if (this.auth.checkLoggedIn()) {
            return true;
        } else {
            this.route.navigate(['/library/login']);
            return false;
        }
    }
}
