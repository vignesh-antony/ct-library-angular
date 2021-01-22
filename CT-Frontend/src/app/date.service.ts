import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor() { }
    checkDate(date:string){
        return moment() > moment(date);
    }
    calcRemainingDays(date:string){
        let date_format = (this.checkDate(date)) ? moment().diff(moment(date)) : moment(date).diff(moment());
        return moment.duration(date_format)
    }
    getRemainingDays(date:string){
        let diff = this.calcRemainingDays(date);
        
        if(diff.years()) return diff.years() + " Years ";
        if(diff.months()) return diff.months() + " Months ";
        if(diff.days()) return diff.days() + " Days ";
        if(diff.hours()) return diff.hours() + " Hours ";
        if(diff.minutes()) return diff.minutes() + " Minutes ";
    }
    getDate(date:string, format:string){
        return moment(date).format(format);
    }
}
