import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {

    @Input() result:any;
    bookList:any;

    constructor() { }
    getBookID(code:any, id:any){
        return code + (""+id).padStart(4,"0");
    }
    ngOnInit(): void {
        this.bookList = this.result;
    }
    ngOnChanges(){
        this.bookList = this.result;
    }
}