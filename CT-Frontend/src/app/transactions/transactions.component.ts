import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../services/date.service';
import { TransactionsService } from '../services/transactions.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: [
        '../search/search.component.scss',
        '../search-book/search-book.component.scss',
        './transactions.component.scss',
    ],
})
export class TransactionsComponent implements OnInit {
    staffs: any;
    start_date: Date;
    end_date: Date;

    ftype: Set<number>;
    filters: any[];

    params: any;
    resetValue: boolean;

    log_records: any = [];
    staff: any;

    page: number;
    total_records: number;
    per_page: number = 12;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dateService: DateService,
        private tranService: TransactionsService
    ) {
        this.staff = { value: 0, name: 'Select Staff' };

        this.activatedRoute.data.subscribe((data) => {
            this.total_records = data['data']['total'];
            this.convertToJSON(data['data']['transactions']);
            this.staffs = {
                list: [this.staff].concat(data['staff']),
                selected: 0,
            };
        });

        this.ftype = new Set();
        this.filters = [
            {
                name: 'Books Issued',
                type: 9,
                checked: false,
                color: '',
            },
            {
                name: 'Books Renewed',
                type: 10,
                checked: false,
                color: 'renew-log',
            },
            {
                name: 'Books Returned',
                type: 11,
                checked: false,
                color: 'return-log',
            },
            {
                name: 'Books Management',
                type: 0,
                checked: false,
                color: 'admin-log',
            },
        ];

        this.params = {
            staff: 0,
            start_date: undefined,
            end_date: undefined,
        };

        this.resetValue = false;
    }

    resetFields() {
        this.resetValue = true;

        this.start_date = undefined;
        this.end_date = undefined;
        this.staff = { value: 0, name: 'Select Staff' };

        this.ftype.clear();
        this.filters.forEach((elem, i) => {
            this.filters[i].checked = false;
        });
    }

    convertToJSON(data: any) {
        if (data.status) return;
        this.log_records = data.map((log: any) => {
            return {
                type: log.type_ref,
                content: JSON.parse(log['content']),
                logTime: {
                    date: this.dateService.getDate(log.logTime, 'DD-MM-YYYY'),
                    time: this.dateService.getDate(log.logTime, 'hh:mm A'),
                },
            };
        });
    }

    updateStaff(data: any) {
        this.staff = data;
    }

    updateFilter(index: number, type: number) {
        this.filters[index].checked = !this.filters[index].checked;
        if (this.ftype.has(type)) this.ftype.delete(type);
        else this.ftype.add(type);
    }

    applyFilter(start: any = null) {
        this.resetValue = false;

        if (start == null) {
            this.page = 1;
            this.params = {
                staff: this.staff.value,
                start_date: this.start_date,
                end_date: this.end_date,
                start: 0,
                type: Array.from(this.ftype),
            };
        } else this.params.start = start;

        this.tranService.getTransactions(this.params).subscribe((data) => {
            this.total_records = data['total'];
            this.convertToJSON(data['transactions']);
        });
    }

    onPageChange(data: any) {
        this.page = data;
        this.applyFilter((this.page - 1) * this.per_page);
    }

    ngOnInit(): void {}
}
