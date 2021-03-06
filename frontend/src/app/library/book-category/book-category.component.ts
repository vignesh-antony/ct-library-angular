import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../services/alert-box.service';
import { BookCategoryService } from '../services/book-category.service';

@Component({
    selector: 'app-book-category',
    templateUrl: './book-category.component.html',
    styleUrls: [
        '../search-book/search-book.component.scss',
        './book-category.component.scss',
    ],
})
export class BookCategoryComponent implements OnInit {
    category: any = [];
    book_borrow: any = [];

    modalView: boolean = false;
    value: any = [];
    error: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private categService: BookCategoryService,
        private alertService: AlertBoxService
    ) {
        this.activatedRoute.data.subscribe((data) => {
            this.category = data['data']['categ'];
            this.book_borrow = data['data']['borrow'];
        });
    }
    private config = {
        heading: 'Add Category',
        fields: [
            { name: 'Category Code', code: 'cID' },
            { name: 'Category Name', code: 'cName' },
        ],
        button: 'Add',
    };

    getConfig() {
        return this.config;
    }
    getCategory() {
        this.categService.getBookCategory().subscribe((data) => {
            this.category = data;
        });
    }
    showPopup(data?: any) {
        this.modalView = true;
        if (data) {
            this.value = data;
            this.config.button = 'Update';
            this.config.heading = 'Update Category';
        } else {
            this.value = [];
            this.config.button = 'Add';
            this.config.heading = 'Add Category';
        }
    }
    closePopup() {
        this.modalView = false;
    }
    postData(value: any) {
        if (!value.cID || !value.cName) {
            this.error = 'Please fill-in both Category ID and Name!';
        } else if (this.value && this.value.length) {
            const update = this.alertService
                .showConfirmBox({
                    status: 'Warning',
                    message: 'Are you sure?',
                    description: 'Do you want to change this book category?',
                    confirm: true,
                })
                .subscribe((res) => {
                    if (res == true) {
                        this.categService
                            .updateBookCategory(value)
                            .subscribe((data) => {
                                this.alertService.showAlertBox(data);
                                if (data.status == 'Success') {
                                    this.getCategory();
                                    this.closePopup();
                                    update.unsubscribe();
                                }
                            });
                    }
                });
        } else {
            this.categService.setBookCategory(value).subscribe((data) => {
                this.alertService.showAlertBox(data);
                if (data.status == 'Success') {
                    this.getCategory();
                    this.closePopup();
                }
            });
        }
    }
    deleteCateg(data: any) {
        console.log(data);
        const del = this.alertService
            .showConfirmBox({
                status: 'Warning',
                message: 'Are you sure?',
                description: 'Do you want to delete this book category?',
                confirm: true,
            })
            .subscribe((res) => {
                if (res == true) {
                    this.categService
                        .deleteBookCategory(data)
                        .subscribe((data) => {
                            this.alertService.showAlertBox(data);
                            if (data.status == 'Success') {
                                this.getCategory();
                                del.unsubscribe();
                            }
                        });
                }
            });
    }
    ngOnInit(): void {}
}
