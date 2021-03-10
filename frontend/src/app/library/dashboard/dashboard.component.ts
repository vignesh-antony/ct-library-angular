import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    stats: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private auth: AuthService
    ) {
        this.activatedRoute.data.subscribe((data: any) => {
            this.stats = data['data'];
        });
    }

    ngOnInit(): void {}
}
