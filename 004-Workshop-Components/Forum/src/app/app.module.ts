import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AsideComponent} from './aside/aside.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ThemeListComponent} from './theme-list/theme-list.component';
import {ThemeListItemComponent} from './theme-list-item/theme-list-item.component';
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {ThemeService} from "./services/theme.service";
import {storageServiceProvider} from "./services/storage.service";
import {PostService} from "./services/post.service";

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    ThemeListComponent,
    ThemeListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService,
    ThemeService,
    storageServiceProvider,
    PostService],
  bootstrap: [AppComponent,
    HeaderComponent,
    FooterComponent]
})
export class AppModule {
}
