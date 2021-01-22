import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchService } from './search.service';

@Component({
    selector: 'search-filter',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Input() config:any;
    @Input() value_change:boolean;
    @Output() dataFound = new EventEmitter<any>();

    conf:any;
    title:string;
    category:string;
    author:string;
    publisher:string;
    year:string;
    options:any;

    constructor(private searchService:SearchService) { 
        this.title = this.category = this.author = this.publisher = this.year = "";
    }
    updateSelectValue(value:any){
        console.log(value);
    }
    resetFields(){
        this.title = this.category = this.author = this.publisher = this.year = "";
    }
    getValue(data:string){
        return "%"+data+"%";
    }
    searchBook(){
        this.searchService.getBooks({
            title: this.getValue(this.title),
            category: this.getValue(this.category),
            author: this.getValue(this.author),
            publisher: this.getValue(this.publisher),
            year: this.getValue(this.year)
        }).subscribe(data => {
            this.dataFound.emit(data);
        });
    }
    viewBook(){
        this.searchService.getStaffBook().subscribe(data => {
            this.dataFound.emit(data);
        });
    }

    ngOnInit(): void {
        this.conf = this.config;
    }
    ngOnChanges(){
        this.conf = this.config;
        if(this.value_change == true) {
            this.searchBook();
            this.value_change = false;
        }
    }
}
