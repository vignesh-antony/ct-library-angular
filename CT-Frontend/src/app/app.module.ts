import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
    declarations: [
        AppComponent,
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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
