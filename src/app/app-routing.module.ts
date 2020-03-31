import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';


const routes: Routes = [
    {path: '',
        redirectTo: '/history',
        pathMatch: 'full'},
    {path: 'history', 
        loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryModule)},
    { path: '**', loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
