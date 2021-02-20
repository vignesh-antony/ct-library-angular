import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';

@Injectable({
    providedIn: 'root',
})
export class TransactionsResolver implements Resolve<boolean> {
    constructor(private tranService: TransactionsService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.tranService.getTransactions(null);
    }
}
