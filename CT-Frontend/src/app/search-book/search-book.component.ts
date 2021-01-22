import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-book',
    templateUrl: './search-book.component.html',
    styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {

    result:any;
    constructor() { }

    getConfig(){
        let config = {
            type:"search-book"
        }
        return config;
    }
    setResultData(value:any){
        this.result = value;
    }
    ngOnInit(): void {
    }

}
