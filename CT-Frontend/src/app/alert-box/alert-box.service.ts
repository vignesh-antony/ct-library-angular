import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertBoxService {

    notify:boolean = false;
    data:any;

    notifyChange:Subject<[boolean, any]> = new Subject<[boolean, any]>();

    constructor() { 
        this.notifyChange.subscribe(([value, data]) =>{
            this.notify = value;
            this.data = data;
        })
    }
    
    hideAlert(){
        this.notifyChange.next([false,{}]);    
    }
    showAlertBox(data:any){
        this.notifyChange.next([true, data]);
    }
}
