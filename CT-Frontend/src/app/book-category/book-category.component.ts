import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertBoxService } from '../alert-box/alert-box.service';
import { BookCategoryService } from './book-category.service';

@Component({
    selector: 'app-book-category',
    templateUrl: './book-category.component.html',
    styleUrls: ['./book-category.component.scss']
})
export class BookCategoryComponent implements OnInit {

    category:any = [];
    modalView:boolean = false;
    value:any = [];

    constructor(
        private activatedRoute:ActivatedRoute, 
        private categService:BookCategoryService,
        private alertService:AlertBoxService) { 
        this.activatedRoute.data.subscribe(data => {
            this.category = data["data"];
        })
    }
    private config = {
        heading:"Add Category",
        fields:[{name:"Category Code",code:"cID"},{name:"Category Name",code:"cName"}],
        button:"Add"
    }

    getConfig(){
        return this.config;
    }
    getCategory(){
        this.categService.getBookCategory().subscribe(data => {
            this.category = data;
        });
    }
    showPopup(data?:any){
        this.modalView = true;
        if(data) {
            this.value = data;
            this.config.button = "Update";
            this.config.heading = "Update Category";
        }
        else {
            this.value = [];
            this.config.button = "Add";
            this.config.heading = "Add Category";
        }
    }
    closePopup(){
        this.modalView = false;
    }
    postData(value:any){
        if(this.value.length){
            this.categService.updateBookCategory(value).subscribe(data => {
                this.alertService.showAlertBox(data);
                if(data.status == 'Success'){
                    this.getCategory();
                    this.closePopup();
                }
            });
        }
        else{
            this.categService.setBookCategory(value).subscribe(data => {
                this.alertService.showAlertBox(data);
                if(data.status == 'Success'){
                    this.getCategory();
                    this.closePopup();
                }
            });
        }
    }
    deleteCateg(id:any){
        this.categService.deleteBookCategory({cID:id}).subscribe(data => {
            this.alertService.showAlertBox(data);
            if(data.status == 'Success'){
                this.getCategory();
            }
        });
    }
    ngOnInit(): void {
    }

}