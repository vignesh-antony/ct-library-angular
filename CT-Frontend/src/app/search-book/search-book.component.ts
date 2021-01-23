import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';

@Component({
    selector: 'app-search-book',
    templateUrl: './search-book.component.html',
    styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {

    result:any;
    category:any[] = [];

    constructor(private alertBox:AlertBoxService,
        private activatedRoute:ActivatedRoute) { 
            this.activatedRoute.data.subscribe(data => {
                this.category.push({name:"Book Category", value:""});
                this.category = this.category.concat(data["categ"]);
            });
        }
    getConfig(){
        let config = {
            type:"search-book",
            categ:{
                list: this.category,
                selected: 0
            }
        }
        return config;
    }
    setResultData(value:any){
        this.result = value;
    }
    ngOnInit(): void {
    }

}
