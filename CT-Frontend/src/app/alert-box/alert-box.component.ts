import { Component, Input, OnInit } from '@angular/core';
import { AlertBoxService } from './alert-box.service';

@Component({
    selector: 'alert-box',
    templateUrl: './alert-box.component.html',
    styleUrls: ['./alert-box.component.scss'],
})
export class AlertBoxComponent implements OnInit {
    showAlert: boolean;
    data: any;

    constructor(private alertService: AlertBoxService) {
        this.alertService.notifyChange.subscribe(([value, data]) => {
            this.showAlert = value;
            this.data = data;
        });
    }

    hideAlert() {
        this.alertService.hideAlert();
    }
    returnConfirm() {
        this.alertService.confirmChange.emit(true);
    }
    ngOnInit(): void {}
}
