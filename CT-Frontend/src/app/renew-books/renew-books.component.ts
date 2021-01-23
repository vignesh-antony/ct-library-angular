import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';
import { RenewBooksService } from './renew-books.service';

@Component({
    selector: 'app-renew-books',
    templateUrl: './renew-books.component.html',
    styleUrls: ['../search-book/search-book.component.scss','./renew-books.component.scss']
})
export class RenewBooksComponent implements OnInit {

    result:any;
    value_change:boolean;
    staff_name:string = "";
    
    options:any[] = [];
    selected:any = { name:"", value:0 };

    constructor(
        private renewService: RenewBooksService, 
        private alertBox: AlertBoxService,
        private activatedRoute:ActivatedRoute) { 
            this.activatedRoute.data.subscribe(data => {
                this.options.push({name:"Select Staff", value:0});
                this.options = this.options.concat(data["data"]);
            })
    }
    getConfig(){
        let config = {
            type:"renew-book",
            options:{
                list: this.options,
                selected:0
            }
        }
        return config;
    }
    setResultData(value:any){
        this.value_change = false;
        this.result = value["result"];
        this.staff_name = value["select"];
    }
    setSelectValue(id:any){
        this.selected = id;
    }
    renewBook(id:any){
        if(this.selected.value != 0){
            this.renewService.renewBooks({s_id:this.selected.value, b_id:id}).subscribe(data => {
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
    returnBook(id:any){
        if(this.selected.value != 0){
            this.renewService.returnBooks({s_id:this.selected.value, b_id:id}).subscribe(data => {
                this.alertBox.showAlertBox(data);
                this.value_change = true;
            });
        }
        else{
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
