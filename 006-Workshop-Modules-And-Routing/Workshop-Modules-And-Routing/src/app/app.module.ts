import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {ThemesModule} from "./feature/themes/themes.module";
import {PagesModule} from "./feature/pages/pages.module";
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./auth/auth.module";
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    ThemesModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    HeaderComponent,
    FooterComponent]
})
export class AppModule {
}
