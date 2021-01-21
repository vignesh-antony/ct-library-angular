import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from './search.service';

@Component({
    selector: 'search-filter',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Output() dataFound = new EventEmitter<any>();

    title:string;
    category:string;
    author:string;
    publisher:string;
    year:string;

    constructor(private searchService:SearchService) { 
        this.title = this.category = this.author = this.publisher = this.year = "";
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
    
    ngOnInit(): void {
        
    }

}
