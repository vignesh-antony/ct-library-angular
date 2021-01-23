import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';
import { IssueBooksService } from './issue-books.service';

@Component({
    selector: 'app-issue-books',
    templateUrl: './issue-books.component.html',
    styleUrls: ['../search-book/search-book.component.scss','./issue-books.component.scss']
})
export class IssueBooksComponent implements OnInit {

    result:any;
    value_change:any;
    
    options:any[] = [];
    selected:any = { name:"", value:0 };

    constructor(
        private issueService:IssueBooksService, 
        private alertBox:AlertBoxService,
        private activatedRoute:ActivatedRoute) { 
            this.activatedRoute.data.subscribe(data => {
                this.options.push({name:"Select Staff", value:0});
                this.options = this.options.concat(data["data"]);
            });
        }

    getConfig(){
        let config = {
            type:"issue-book",
            options:{
                list: this.options,
                selected: 0
            }
        }
        return config;
    }
    setResultData(value:any){
        this.value_change = false;
        this.result = value;
    }
    setSelectValue(id:any){
        this.selected = id;
    }
    issueBook(id:any){
        if(this.selected.value != 0){
            this.issueService.issueBookToStaff({s_id:this.selected.value, b_id:id}).subscribe(data => {
                this.alertBox.showAlertBox(data);
                this.value_change = true;
            });
        }
        else {
            this.alertBox.showAlertBox({
                status:"Warning",
                message:"Please select staff",
                description:"Select the staff to whom the book has to be issued."
            });
        }
    }
    ngOnInit(): void {
    }

}
