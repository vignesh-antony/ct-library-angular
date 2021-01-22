import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {

    @Input() result:any;
    @Input() config:any;
    @Output() issueBook = new EventEmitter<any>();

    bookList:any;
    conf:any;

    constructor() { }
    getBookID(code:any, id:any){
        return code + (""+id).padStart(4,"0");
    }
    issue(id:any){
        this.issueBook.emit(id);
    }
    ngOnInit(): void {
        this.bookList = this.result;
        this.conf = this.config;
    }
    ngOnChanges(){
        this.bookList = this.result;
        this.conf = this.config;
    }
}
