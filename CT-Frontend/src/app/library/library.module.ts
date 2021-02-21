import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { NavbarComponent } from './navbar/navbar.component';
import { FootbarComponent } from './footbar/footbar.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { SearchComponent } from './search/search.component';
import { ResultTableComponent } from './result-table/result-table.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { PendingBooksComponent } from './pending-books/pending-books.component';
import { IssueBooksComponent } from './issue-books/issue-books.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { RenewBooksComponent } from './renew-books/renew-books.component';
import { BookCategoryComponent } from './book-category/book-category.component';
import { PopupComponent } from './popup/popup.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        LibraryComponent,
        NavbarComponent,
        FootbarComponent,
        SearchBookComponent,
        SearchComponent,
        ResultTableComponent,
        BorrowedBooksComponent,
        PendingBooksComponent,
        IssueBooksComponent,
        FormSelectComponent,
        AlertBoxComponent,
        RenewBooksComponent,
        BookCategoryComponent,
        PopupComponent,
        ManageBooksComponent,
        TransactionsComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        LibraryRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
    ],
    providers: [],
})
export class LibraryModule {}
