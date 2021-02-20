import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-book',
    templateUrl: './search-book.component.html',
    styleUrls: ['./search-book.component.scss'],
})
export class SearchBookComponent implements OnInit {
    result: any;
    category: any[] = [];

    constructor(private activatedRoute: ActivatedRoute) {
        this.activatedRoute.data.subscribe((data) => {
            this.category.push({ name: 'Book Category', value: '' });
            this.category = this.category.concat(data['categ']);
        });
    }
    getConfig() {
        const config = {
            type: 'search-book',
            categ: {
                list: this.category,
                selected: 0,
            },
            button: 'Search Books',
        };
        return config;
    }
    setResultData(value: any) {
        this.result = value;
    }
    ngOnInit(): void {}
}
