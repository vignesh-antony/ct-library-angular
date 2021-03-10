import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
    stats: any;

    constructor(private activatedRoute: ActivatedRoute) {
        this.activatedRoute.data.subscribe((data: any) => {
            this.stats = data['data'];
        });
    }

    ngOnInit(): void {}
}
