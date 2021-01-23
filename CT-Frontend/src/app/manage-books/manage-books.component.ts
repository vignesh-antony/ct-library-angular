import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-manage-books',
    templateUrl: './manage-books.component.html',
    styleUrls: ['../search-book/search-book.component.scss','./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

    result:any;
    category:any[] = [];

    constructor(private activatedRoute:ActivatedRoute) { 
        this.activatedRoute.data.subscribe(data => {
            this.category.push({name:"Book Category", value:""});
            this.category = this.category.concat(data["categ"]);
        })
    }
    getConfig(){
        let config = {
            type:"manage-book",
            categ:{
                list: this.category,
                selected: 0
            },
            button: "Search Books"
        }
        return config;
    }
    setResultData(value:any){
        this.result = value;
    }

    ngOnInit(): void {
    }

}
