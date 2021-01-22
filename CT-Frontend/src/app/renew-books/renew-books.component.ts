import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-renew-books',
    templateUrl: './renew-books.component.html',
    styleUrls: ['../search-book/search-book.component.scss','./renew-books.component.scss']
})
export class RenewBooksComponent implements OnInit {

    result:any;
    value_change:boolean;

    constructor() { }
    getConfig(){
        let config = {
            type:"renew-book",
            options:{
                list:[
                    {name:"Red", value:"0"},
                    {name:"Green", value:"1"},
                    {name:"Yellow", value:"2"},
                    {name:"Blue", value:"3"}
                ],
                selected:0
            }
        }
        return config;
    }
    setResultData(value:any){
        this.value_change = false;
        this.result = value;
    }
    ngOnInit(): void {
    }

}
