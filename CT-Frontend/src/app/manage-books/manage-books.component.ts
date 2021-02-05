import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';

@Component({
    selector: 'app-manage-books',
    templateUrl: './manage-books.component.html',
    styleUrls: ['../search-book/search-book.component.scss','./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

    result:any;
    modalView:boolean = false;
    value:any = [];
    category:any[] = [];

    constructor(private activatedRoute:ActivatedRoute, private alertBox:AlertBoxService) { 
        this.activatedRoute.data.subscribe(data => {
            this.category.push({name:"Book Category", value:""});
            this.category = this.category.concat(data["categ"]);
        });
    }
    
    private config = {
        heading:"Edit Book",
        fields:[
            {
                name:"Book Title",
                code:"bName",
                textarea:true
            },
            {
                name:"Book Category",
                code:"cID",
                select:true, 
                select_value: { 
                    list: [], 
                    selected: 0 
                },
                hidden:true 
            },
            {
                name:"Book Author",
                code:"bAuthor"
            },
            {
                name:"Publications",
                code:"bPublish"
            },
            {
                name:"Published Year",
                code:"bYear"
            },
            {
                name:"Book Count",
                code:"bCopy"
            },
            {
                name:"Book ID",
                code:"bID",
                hidden:true
            }
        ],
        button:"Update Book"
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
    closePopup(){
        this.modalView = false;
    }
    postData(data:any){
        console.log(data);
        if(data.cID == ""){
            this.alertBox.showAlertBox({
                status:"Warning",
                message:"Please select category",
                description:"The book category cannot be empty! Please select one."
            });
        }
        else if(data.bCopy == 0){
            this.alertBox.showAlertBox({
                status:"Warning",
                message:"Book Count cannot be Zero",
                description:"Please provide the book count greater than zero."
            });
        }
    }
    setResultData(value:any){
        this.result = value;
    }
    getPopupConfig(){
        // For editing book category
        this.config.fields[1].select_value.list = this.category;
        return this.config;
    }
    getBookData(data:any){
        let res = [];
        res.push(data.bName);
        res.push(data.cID);
        res.push(data.bAuthor);
        res.push(data.bPublish);
        res.push(data.bYear);
        res.push(data.bCopy);
        res.push(data.bID);
        return res;
    }
    getCateg(categ:any){
        let pos = 0;
        this.category.some((elem, i) => {
            if(elem.value == categ) pos = i; 
        });
        return pos;
    }
    showPopup(data?:any){
        this.modalView = true;
        if(data) {
            this.value = this.getBookData(data);
            this.config.fields[1].select_value.selected = this.getCateg(data.cID);

            this.config.button = "Update Book";
            this.config.heading = "Edit Book";
        }
        else {
            this.value = [];
            this.config.button = "Add New Book";
            this.config.heading = "Add Book";
        }
    }
    ngOnInit(): void {
    }

}
