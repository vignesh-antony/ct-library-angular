import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/auth/auth.service';
import { AlertBoxService } from '../services/alert-box.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    currentUser: User;
    constructor(private auth: AuthService, private alertBox: AlertBoxService) {
        this.auth.currentUser.subscribe((data) => {
            this.currentUser = data;
        });
    }

    logout() {
        this.alertBox
            .showConfirmBox({
                status: 'Warning',
                message: 'Are you sure?',
                description: 'Do you want to logout from CT-Library?',
                confirm: true,
            })
            .subscribe((res) => {
                if (res == true) {
                    this.auth.logoutUser();
                }
            });
    }

    ngOnInit(): void {}
}
