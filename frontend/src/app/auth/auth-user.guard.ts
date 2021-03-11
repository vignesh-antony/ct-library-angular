import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthUserGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {}
    canActivate(): boolean {
        let admin_user = this.auth.currentUserSubject.value.admin;
        if (admin_user === false) return true;
        else {
            this.router.navigate(['/library/admin']);
            return false;
        }
    }
}
