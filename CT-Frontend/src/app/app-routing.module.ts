import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { BorrowedBooksResolver } from './borrowed-books/borrowed-books.resolver';
import { PendingBooksComponent } from './pending-books/pending-books.component';
import { PendingBooksResolver } from './pending-books/pending-books.resolver';
import { SearchBookComponent } from './search-book/search-book.component';

const routes: Routes = [
    {
        path:"search-book",
        component:SearchBookComponent
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
