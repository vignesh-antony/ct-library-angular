import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { config } from 'process';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['../search/search.component.scss','./popup.component.scss']
})
export class PopupComponent implements OnInit {

    @Input() config:any;
    @Input() popup:boolean;
    @Input() popup_value:any;
    @Output() hideView = new EventEmitter<any>();
    @Output() modalData = new EventEmitter<any>();
    
    data:any = {};
    input:any[] = [];
    view:boolean;

    constructor() { }
    setConfig(){
        for(let i = 0; i < this.config.fields.length; i++){
            if(this.popup_value) this.input.push(this.popup_value[i]);
            else this.input.push("");    
        }
        return this.config;
    }
    resetModal(){
        for(let i = 0; i < this.input.length; i++) this.input[i] = "";
    }
    closeModal(){
        this.hideView.emit(false);
    }
    postData(){
        let value = {};
        this.config.fields.forEach((field:any, i:any) => {
            value[field.code] = this.input[i];
        });
        value["prev"] = this.popup_value[0];
        console.log(value);
        this.modalData.emit(value);
    }
    ngOnInit(): void {
        this.data = this.setConfig(); 
        this.view = this.popup;    
    }
}
