import { Component, OnInit } from '@angular/core';
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

    constructor(
        private issueService:IssueBooksService, 
        private alertBox:AlertBoxService) { }

    getConfig(){
        let config = {
            type:"issue-book",
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
    issueBook(id:any){
        this.issueService.issueBookToStaff({s_id:58, b_id:id}).subscribe(data => {
            this.alertBox.showAlertBox(data);
            this.value_change = true;
        });
    }
    ngOnInit(): void {
    }

}
