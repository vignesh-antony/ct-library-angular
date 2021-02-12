import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../date.service';
import { TransactionsService } from './transactions.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['../search/search.component.scss','../search-book/search-book.component.scss','./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

    staffs:any;
    start_date:Date;
    end_date:Date;

    log_records:any = [];
    staff:any;

    constructor(
        private activatedRoute:ActivatedRoute, 
        private dateService:DateService,
        private tranService:TransactionsService
        ) {
        this.staff = { value:0, name:"Select Staff" }; 
        
        this.activatedRoute.data.subscribe(data => {
            this.convertToJSON(data["data"]);
            this.staffs = { 
                list: [this.staff].concat(data["staff"]), 
                selected:0 
            };       
        })
    }

    convertToJSON(data:any){
        if(data.status) return;
        this.log_records = data.map((log:any) => {
            return {
                type:log.type_ref,
                content:JSON.parse(log['content']),
                logTime:{
                    date: this.dateService.getDate(log.logTime,"DD-MM-YYYY"),
                    time: this.dateService.getDate(log.logTime,"hh:mm A")
                }
            };
        });
    }

    updateStaff(data:any){
        this.staff = data;
    }

    applyFilter(){
        let params = {
            staff:this.staff.value,
            start_date:this.start_date,
            end_date:this.end_date
        }
        this.tranService.getTransactions(params).subscribe(data => {
            this.convertToJSON(data);
        });
    }

    ngOnInit(): void {
    }

}
