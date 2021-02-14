import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private api_url: string;
    private base_url: string;

    constructor() {
        this.api_url = 'http://localhost:3000';
        this.base_url = 'http://localhost:4200';
    }

    get API() {
        return this.api_url;
    }
    get BaseURL() {
        return this.base_url;
    }
}
