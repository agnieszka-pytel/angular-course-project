import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';


const routes: Routes = [
    {path: '',
        redirectTo: '/history',
        pathMatch: 'full'},
    {path: 'history', component: HistoryComponent},
    {path: 'book/:id', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
