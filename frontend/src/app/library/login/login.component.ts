import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AlertBoxService } from '../services/alert-box.service';
import { LoginService } from './login.service';

@Component({
    selector: 'library-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(
        private login: LoginService,
        private auth: AuthService,
        private alertBox: AlertBoxService,
        private route: Router
    ) {}
    loginUser() {
        this.login
            .checkUser({ email: this.email, password: this.password })
            .subscribe((data) => {
                if (data.status == 'Error') {
                    this.alertBox.showAlertBox(data);
                } else {
                    this.auth.storeToken(data);
                    this.auth.currentUser.subscribe((data) => {
                        if (data.logged) {
                            if (data.admin)
                                this.route.navigate(['/library/admin']);
                            else this.route.navigate(['/library']);
                        } else this.route.navigate(['/library']);
                    });
                }
            });
    }
    ngOnInit(): void {}
}
