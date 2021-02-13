import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AlertBoxService } from '../alert-box/alert-box.service';
import { SearchService } from './search.service';

@Component({
    selector: 'search-filter',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    @Input() config: any;
    @Input() value_change: boolean;
    @Output() dataFound = new EventEmitter<any>();
    @Output() selected = new EventEmitter<any>();

    conf: any;
    title: string;
    author: string;
    publisher: string;
    year: string;
    category: string = '';

    options: any;
    selectValue: any = 0;
    resetValue: boolean;

    constructor(
        private searchService: SearchService,
        private alertService: AlertBoxService
    ) {
        this.title = this.category = this.author = this.publisher = this.year =
            '';
        this.resetValue = false;
    }
    updateSelectValue(data: any) {
        this.selectValue = data;
        this.selected.emit(data);
    }
    updateCategValue(data: any) {
        this.category = data.value;
    }
    resetFields() {
        this.title = this.category = this.author = this.publisher = this.year =
            '';
        this.resetValue = true;
    }
    getValue(data: string) {
        return '%' + data + '%';
    }
    searchBook() {
        if (
            this.title != '' ||
            this.author != '' ||
            this.category != '' ||
            this.publisher != '' ||
            this.year != ''
        ) {
            this.searchService
                .getBooks({
                    title: this.getValue(this.title),
                    category: this.getValue(this.category),
                    author: this.getValue(this.author),
                    publisher: this.getValue(this.publisher),
                    year: this.getValue(this.year),
                })
                .subscribe((data) => {
                    this.dataFound.emit(data);
                });
        } else {
            this.alertService.showAlertBox({
                status: 'Warning',
                message: 'Please fill in atleast one field',
                description: 'Please provide at least one value for filtering!',
            });
        }
    }
    viewBook() {
        if (this.selectValue.value != 0) {
            this.searchService
                .getStaffBook(+this.selectValue.value)
                .subscribe((data) => {
                    this.dataFound.emit({
                        result: data,
                        select: this.selectValue,
                    });
                });
        } else {
            this.alertService.showAlertBox({
                status: 'Warning',
                message: 'Please select staff',
                description:
                    'Select the staff to whom the book has to be issued.',
            });
        }
    }

    ngOnInit(): void {
        this.conf = this.config;
    }
    ngOnChanges() {
        this.conf = this.config;
        if (this.value_change == true) {
            if (this.conf.type == 'renew-book') this.viewBook();
            else {
                if (
                    this.title != '' ||
                    this.author != '' ||
                    this.category != '' ||
                    this.publisher != '' ||
                    this.year != ''
                )
                    this.searchBook();
            }
            this.value_change = false;
        }
    }
}
