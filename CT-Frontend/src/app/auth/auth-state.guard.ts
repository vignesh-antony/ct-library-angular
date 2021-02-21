import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthStateGuard implements CanActivate {
    constructor(private auth: AuthService, private route: Router) {}
    canActivate(): boolean {
        if (this.auth.checkLoggedIn()) {
            this.route.navigate(['/library']);
            return false;
        }
        return true;
    }
}
