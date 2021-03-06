import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookCategoryComponent } from './book-category/book-category.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { IssueBooksComponent } from './issue-books/issue-books.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { PendingBooksComponent } from './pending-books/pending-books.component';
import { RenewBooksComponent } from './renew-books/renew-books.component';
import { BookCategoryResolver } from './resolver/book-category.resolver';
import { BorrowedBooksResolver } from './resolver/borrowed-books.resolver';
import { CategoryResolver } from './resolver/category.resolver';
import { PendingBooksResolver } from './resolver/pending-books.resolver';
import { StaffResolver } from './resolver/staff.resolver';
import { TransactionsResolver } from './resolver/transactions.resolver';
import { SearchBookComponent } from './search-book/search-book.component';
import { TransactionsComponent } from './transactions/transactions.component';

import { LibraryComponent } from './library.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthStateGuard } from '../auth/auth-state.guard';
import { AuthAdminGuard } from '../auth/auth-admin.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StatsResolver } from './resolver/stats.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthUserGuard } from '../auth/auth-user.guard';

const routes: Routes = [
    {
        path: '',
        component: LibraryComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthUserGuard],
                resolve: { data: StatsResolver },
            },
            {
                path: 'admin',
                component: AdminDashboardComponent,
                canActivate: [AuthAdminGuard],
                resolve: { data: StatsResolver },
            },
            {
                path: 'search-books',
                component: SearchBookComponent,
                resolve: {
                    categ: CategoryResolver,
                },
            },
            {
                path: 'borrowed-books',
                component: BorrowedBooksComponent,
                canActivate: [AuthUserGuard],
                resolve: {
                    data: BorrowedBooksResolver,
                },
            },
            {
                path: 'pending-books',
                component: PendingBooksComponent,
                canActivate: [AuthUserGuard],
                resolve: {
                    data: PendingBooksResolver,
                },
            },
            {
                path: 'issue-books',
                component: IssueBooksComponent,
                canActivate: [AuthAdminGuard],
                resolve: {
                    data: StaffResolver,
                    categ: CategoryResolver,
                },
            },
            {
                path: 'renew-books',
                component: RenewBooksComponent,
                canActivate: [AuthAdminGuard],
                resolve: {
                    data: StaffResolver,
                },
            },
            {
                path: 'book-category',
                component: BookCategoryComponent,
                canActivate: [AuthAdminGuard],
                resolve: {
                    data: BookCategoryResolver,
                },
            },
            {
                path: 'manage-books',
                component: ManageBooksComponent,
                canActivate: [AuthAdminGuard],
                resolve: {
                    categ: CategoryResolver,
                },
            },
            {
                path: 'transactions',
                component: TransactionsComponent,
                resolve: {
                    data: TransactionsResolver,
                    staff: StaffResolver,
                },
            },
        ],
    },
    {
        path: 'login',
        component: LibraryComponent,
        canActivate: [AuthStateGuard],
        children: [
            {
                path: '',
                component: LoginComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LibraryRoutingModule {}
