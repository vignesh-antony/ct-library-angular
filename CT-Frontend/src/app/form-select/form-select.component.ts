import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

    @Input() options:any;
    @Output() selectValue = new EventEmitter<any>();

    dropdown:boolean;
    optionList:any;
    
    constructor() { }

    toggleDropDown(){
        this.dropdown = !this.dropdown;
    }
    updateOption(pos:any, option:any){
        this.optionList.selected = pos;
        this.selectValue.emit(option);
        this.toggleDropDown();
    }
    ngOnInit(): void {
        this.optionList = this.options;
    }
    ngOnChanges(){
        this.optionList = this.options;
    }
}
