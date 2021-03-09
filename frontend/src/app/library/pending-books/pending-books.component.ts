import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../services/date.service';

@Component({
    selector: 'app-pending-books',
    templateUrl: './pending-books.component.html',
    styleUrls: [
        '../borrowed-books/borrowed-books.component.scss',
        './pending-books.component.scss',
    ],
})
export class PendingBooksComponent implements OnInit {
    bookList: any;
    prevDate: string[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private dateService: DateService
    ) {
        this.activatedRoute.data.subscribe((data) => {
            this.bookList = data['data'];
            console.log(this.bookList);
        });
    }
    getPrevDate() {
        let res: string;
        let prevres: string;

        for (let i = 0; i < this.bookList.length; i++) {
            res = this.getDate(this.bookList[i].timeIn, 'MMMM YYYY');
            if (i != 0) {
                if (prevres == res) res = '';
                else prevres = res;
            } else prevres = res;

            this.prevDate.push(res);
        }
    }
    checkDate(date: string) {
        return this.dateService.checkDate(date);
    }
    getRemainingDays(date: string) {
        return this.dateService.getRemainingDays(date);
    }
    getDate(date: string, format: string) {
        return this.dateService.getDate(date, format);
    }
    getTimeInterval(date: string) {
        let t = this.dateService.calcRemainingDays(date).asMilliseconds();
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hour = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((t % (1000 * 60)) / 1000);

        return (
            'Late by ' + days + 'd ' + hour + 'h ' + mins + 'm ' + secs + 's'
        );
    }
    ngOnInit(): void {
        this.prevDate = [];

        this.getPrevDate();
    }
}
