import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlertBoxService {
    notify: boolean = false;
    data: any;

    notifyChange: Subject<[boolean, any]> = new Subject<[boolean, any]>();
    confirmChange = new EventEmitter<boolean>();

    constructor() {
        this.notifyChange.subscribe(([value, data]) => {
            this.notify = value;
            this.data = data;
        });
    }

    hideAlert() {
        this.notifyChange.next([false, {}]);
    }
    showAlertBox(data: any) {
        this.notifyChange.next([true, data]);
    }
    showConfirmBox(data: any) {
        this.showAlertBox(data);
        return new Observable<boolean>((observer) => {
            this.confirmChange.subscribe((data: boolean) => {
                if (data == true) {
                    observer.next(data);
                    this.hideAlert();
                    observer.complete();
                }
            });
        });
    }
}
