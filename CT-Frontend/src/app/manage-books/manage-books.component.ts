import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';
import { ManageBooksService } from './manage-books.service';

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
    
    book_count:any = 0;
    value_change:any;

    constructor(
        private activatedRoute:ActivatedRoute, 
        private alertBox:AlertBoxService,
        private manageService:ManageBooksService) { 
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
        button:"Update Book",
        type:"update"
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
        if(data.bName == "" || data.bAuthor == ""){
            this.alertBox.showAlertBox({
                status:"Warning",
                message:"Please Fill-in required fields",
                description:"Please provide info about Book name and author."
            });
        }
        else if(data.cID == ""){
            this.alertBox.showAlertBox({
                status:"Warning",
                message:"Please select category",
                description:"The book category cannot be empty! Please select one."
            });
        }
        else if(isNaN(+data.bYear)){
            this.alertBox.showAlertBox({
                status:"Warning",
                message:"Invalid Published Year",
                description:"Please provide the published year of the book."
            });
        }
        else if(data.bCopy == "" || (+data.bCopy != this.book_count && +data.bCopy <= 0)){
            this.alertBox.showAlertBox({
                status:"Warning",
                message:"Invalid Book Count",
                description:"Please provide the book count greater than zero."
            });
        }
        else{
            if(this.config.type == "update"){
                data.book_count = this.book_count;
                this.manageService.updateBook(data).subscribe(res => {
                    this.alertBox.showAlertBox(res);
                    this.modalView = false;
                    this.value_change = true;
                });
            }
            else{
                data.book_count = 0;
                this.manageService.addBook(data).subscribe(res => {
                    this.alertBox.showAlertBox(res);
                    this.modalView = false;
                    this.value_change = true;
                });
            }
        }
    }
    setResultData(value:any){
        this.value_change = false;
        this.result = value;
    }
    getPopupConfig(){
        // For editing book category
        this.config.fields[1].select_value.list = this.category;

        if(this.config.type == "update"){
            this.config.button = "Edit Book";
            this.config.heading = "Update Book";
        }
        else{
            this.config.button = "Add Book";
            this.config.heading = "Add New Book";
        }

        return this.config;
    }
    getBookData(data:any){
        let res = [];
        res.push(data.bName);
        res.push(data.cID);
        
        res.push(data.bAuthor);
        res.push(data.bPublish);
        res.push(data.bYear);

        /* For maintaining Original Book Count */ 
        this.book_count = +data.bCopy;

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
    addBook(){
        this.modalView = true;
        this.config.type = "add";
        
        this.value = [];
        this.config.fields[1].select_value.selected = 0;
    }
    editBook(data?:any){
        this.modalView = true;
        this.config.type = "update";

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
    deleteBook(data:any){
        this.manageService.deleteBook({bID: data}).subscribe(data => {
            this.alertBox.showAlertBox(data);
            this.value_change = true;
        })
    }
    ngOnInit(): void {
    }

}
