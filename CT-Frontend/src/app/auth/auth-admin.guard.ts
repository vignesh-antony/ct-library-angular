import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {}
    canActivate(): boolean {
        let admin_user = this.auth.currentUserSubject.value.admin;
        if (admin_user === true) return true;
        else {
            this.router.navigate(['/library']);
            return false;
        }
    }
}
