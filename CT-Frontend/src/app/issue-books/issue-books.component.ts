import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';
import { IssueBooksService } from './issue-books.service';

@Component({
    selector: 'app-issue-books',
    templateUrl: './issue-books.component.html',
    styleUrls: [
        '../search-book/search-book.component.scss',
        './issue-books.component.scss',
    ],
})
export class IssueBooksComponent implements OnInit {
    result: any;
    value_change: any;

    options: any[] = [];
    category: any[] = [];
    selected: any = { name: '', value: 0 };

    constructor(
        private issueService: IssueBooksService,
        private alertBox: AlertBoxService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.data.subscribe((data) => {
            this.options.push({ name: 'Select Staff', value: 0 });
            this.options = this.options.concat(data['data']);

            this.category.push({ name: 'Book Category', value: '' });
            this.category = this.category.concat(data['categ']);
        });
    }

    getConfig() {
        let config = {
            type: 'issue-book',
            options: {
                list: this.options,
                selected: 0,
            },
            categ: {
                list: this.category,
                selected: 0,
            },
            button: 'Check Availability',
        };
        return config;
    }
    setResultData(value: any) {
        this.value_change = false;
        this.result = value;
    }
    setSelectValue(id: any) {
        this.selected = id;
    }
    issueBook(data: any) {
        if (this.selected.value != 0) {
            const issue = this.alertBox
                .showConfirmBox({
                    status: 'Warning',
                    message: 'Are you sure?',
                    description: 'Do you want to issue this book?',
                    confirm: true,
                })
                .subscribe((res: boolean) => {
                    if (res == true) {
                        this.issueService
                            .issueBookToStaff({
                                s_id: this.selected.value,
                                s_name: this.selected.name,
                                b_id: data.bID,
                                b_name: data.bName,
                                b_auth: data.bAuthor,
                                c_id: data.cID,
                            })
                            .subscribe((data) => {
                                this.alertBox.showAlertBox(data);
                                this.value_change = true;
                                issue.unsubscribe();
                            });
                    }
                });
        } else {
            this.alertBox.showAlertBox({
                status: 'Warning',
                message: 'Please select staff',
                description:
                    'Select the staff to whom the book has to be issued.',
            });
        }
    }
    ngOnInit(): void {}
}
