import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CoreModule} from "./core/core.module";
import {PagesModule} from "./feature/pages/pages.module";
import {AuthService} from "./service/auth.service";
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
    PagesModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.authenticate()
      },
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent,
    HeaderComponent,
    FooterComponent]
})
export class AppModule {
}
