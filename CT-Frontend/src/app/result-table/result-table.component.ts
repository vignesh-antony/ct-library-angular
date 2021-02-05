import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../date.service';

@Component({
    selector: 'result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {

    @Input() result:any;
    @Input() config:any;
    @Input() select:any;
    @Output() issueBook = new EventEmitter<any>();
    @Output() renewBook = new EventEmitter<any>();
    @Output() returnBook = new EventEmitter<any>();
    @Output() editBook = new EventEmitter<any>();

    bookList:any;
    conf:any;
    selected:any;

    constructor(private dateService: DateService) { }
    getBookID(code:any, id:any){
        return code + (""+id).padStart(4,"0");
    }
    issue(id:any){
        this.issueBook.emit(id);
    }
    renew(id:any){
        this.renewBook.emit(id);
    }
    return(id:any){
        this.returnBook.emit(id);
    }
    edit(book:any){
        this.editBook.emit(book);
    }
    getDateTime(date:string){
        let d = moment(date);
        return d.format("DD-MM-YYYY") + "<br>" + d.format("hh:mm a");
    }
    checkDate(date:string){
        return this.dateService.checkDate(date);
    }
    ngOnInit(): void {
        this.bookList = this.result;
        this.conf = this.config;
        this.selected = this.select;
    }
    ngOnChanges(){
        this.bookList = this.result;
        this.conf = this.config;
        this.selected = this.select;
    }
}
