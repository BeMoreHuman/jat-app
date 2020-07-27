import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {JatAppComponent} from './components/jat-app/jat-app.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/jat-app'},
  {path: 'jat-app', component: JatAppComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
