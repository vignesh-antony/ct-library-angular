import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookCategoryComponent } from './book-category/book-category.component';
import { BookCategoryResolver } from './resolver/book-category.resolver';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { BorrowedBooksResolver } from './resolver/borrowed-books.resolver';
import { IssueBooksComponent } from './issue-books/issue-books.component';
import { PendingBooksComponent } from './pending-books/pending-books.component';
import { PendingBooksResolver } from './resolver/pending-books.resolver';
import { RenewBooksComponent } from './renew-books/renew-books.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { StaffResolver } from './resolver/staff.resolver';
import { CategoryResolver } from './resolver/category.resolver';

const routes: Routes = [
    {
        path:"search-book",
        component:SearchBookComponent,
        resolve:{
            categ:CategoryResolver
        }
    },
    {
        path:"borrowed-books",
        component:BorrowedBooksComponent,
        resolve:{
            data:BorrowedBooksResolver
        }
    },
    {
        path:"pending-books",
        component:PendingBooksComponent,
        resolve:{
            data:PendingBooksResolver
        }
    },
    {
        path:"issue-books",
        component:IssueBooksComponent,
        resolve:{
            data:StaffResolver,
            categ:CategoryResolver
        }
    },
    {
        path:"renew-books",
        component:RenewBooksComponent,
        resolve:{
            data:StaffResolver
        }
    },
    {
        path:"book-category",
        component:BookCategoryComponent,
        resolve:{
            data:BookCategoryResolver
        }
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
