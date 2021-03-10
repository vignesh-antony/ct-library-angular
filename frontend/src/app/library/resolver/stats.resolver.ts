import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StatsService } from '../services/stats.service';

@Injectable({
    providedIn: 'root',
})
export class StatsResolver implements Resolve<any> {
    constructor(private statService: StatsService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.statService.getLibraryStats();
    }
}
