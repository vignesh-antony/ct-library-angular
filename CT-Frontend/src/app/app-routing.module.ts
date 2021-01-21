import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBookComponent } from './search-book/search-book.component';

const routes: Routes = [
    {
        path:"search-book",
        component:SearchBookComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
