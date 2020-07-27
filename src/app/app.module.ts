import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ModalComponent} from './components/modal/modal.component';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UsersFilterComponent} from './components/users-filter/users-filter.component';
import {HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JatAppComponent } from './components/jat-app/jat-app.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    UsersTableComponent,
    UsersFilterComponent,
    NotFoundComponent,
    JatAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
