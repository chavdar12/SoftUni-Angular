import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {ThemesModule} from "./feature/themes/themes.module";
import {PagesModule} from "./feature/pages/pages.module";
import {AuthModule} from "./auth/auth.module";
import {FooterComponent} from './core/footer/footer.component';
import {HeaderComponent} from './core/header/header.component';

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
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent,
    HeaderComponent,
    FooterComponent]
})
export class AppModule {
}
