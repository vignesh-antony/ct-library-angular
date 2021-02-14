import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../services/date.service';

@Component({
    selector: 'app-borrowed-books',
    templateUrl: './borrowed-books.component.html',
    styleUrls: ['./borrowed-books.component.scss'],
})
export class BorrowedBooksComponent implements OnInit {
    bookList: any;
    prevDate: string[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private dateService: DateService
    ) {
        this.activatedRoute.data.subscribe((data) => {
            this.bookList = data['data'];
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

    ngOnInit(): void {
        this.prevDate = [];
        this.getPrevDate();
    }
}
